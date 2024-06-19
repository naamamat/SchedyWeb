import pandas as pd
import random
from deap import base, creator, tools, algorithms

# Read the first CSV file (shifts)
shifts_df = pd.read_csv('shifts.csv')
print("Shift columns:", shifts_df.columns)
# Read the second CSV file (workers)
workers_df = pd.read_csv('workers.csv')
print("Worker columns:", workers_df.columns)

# Define the workers tuple
workers = []
for index, row in workers_df.iterrows():
    worker = (row['worker_id'], row['name'], (row['skill1'], row['skill2'], row['skill3']))
    workers.append(worker)

# Define the shifts format
shifts = []
for index, row in shifts_df.iterrows():
    shift = (row['skill'], row['day'], row['start_hour'], row['end_hour'], row['number_of_workers'], row['cost_per_worker'])
    shifts.append(shift)

# Print the first few workers and shifts for verification
print("Workers:")
for worker in workers:
    print(worker)

print("\nShifts:")
for shift in shifts:
    print(shift)

# Prepare data
shift_count = len(shifts_df)
worker_count = len(workers_df)

# Genetic Algorithm setup

creator.create("FitnessMin", base.Fitness, weights=(-1.0,))#create fitness foe each one of the individuals (-1,0) means a minimum problem
creator.create("Individual", list, fitness=creator.FitnessMin)#optoional solution

toolbox = base.Toolbox()#the deap object


def isValid(individual):
    """
       This function checks if a schedule is valid according to the problem rules.
       The rules are:
       1. A worker cannot work two shifts in the same time.
       2. the worker needs to work in one of his skiils.
       :param individual: dic of shifts and assigment of one day
       for example: { first_worker : [shift1, shift2] , ...}
       shifts looks like : [skill,day,start_hour,end_hour,number_of_workers,cost_per_worker]
       worker looks like : worker_id,name,skill1,skill2,skill3
       :return: True if the schedule is valid, False otherwise
        # סידרתי את המשמרות שהמפתח הוא עובד ולא משמרת כי ככה יהיה יותר קל לבדוק חפיפה
        # בדיקת חפיפה: לעבור על המשמרות ולבדוק שמשמרת הקודמת מסיימת לפני שההבאה מתחילה
    """
    for worker, shifts in individual.items():
        # Create a list of tuples (start_hour, end_hour) for the worker's shifts
        shift_times = [(shift[2], shift[3]) for shift in shifts]

        # Check for overlapping shifts
        for i in range(len(shift_times)):
            for j in range(i + 1, len(shift_times)):
                start1, end1 = shift_times[i]
                start2, end2 = shift_times[j]
                # 9-9:30 10-15 start1= 9 end1=14
                if not (end1 > start2 or end2 > start1 or end2 > start1 or end1 > start2):
                    return False

        # Check if the worker is working within their skills
        worker_skills = [shift[0] for shift in shifts]
        for shift in shifts:
            if shift[0] not in worker_skills:
                return False

    return True

def backtrack(individual):
    """
    This recursive function generates a valid schedule.
    It uses a backtracking algorithm, which is a type of depth-first search.
    The algorithm tries all possible combinations of workers for each week.
    If it finds a valid schedule, it stops and returns True.
    If it cannot find a valid schedule, it backtracks and tries a different combination.
    :param individual: dic of shifts and assigment of one day
       for example: { first_worker : [shift1, shift2] , ...}
    :return: True if a valid schedule has been generated, False otherwise
    """
    shifts_assigned={}
    for individual_shifts in individual.values():
        for shift in individual_shifts:
            if shift not in shifts_assigned:
                shifts_assigned[shift] = 0
            shifts_assigned[shift] += 1

    shifts_need_assigment = ()
    for shift in shifts:
        if shift not in shifts_assigned:
            shifts_need_assigment.__add__(shift)
        else:
            if shifts_assigned[shift]<shift[4]:
                shifts_need_assigment.__add__(shift)

    workers= individual.keys()
    # If all shifts are assigned, check if the schedule is valid
    if len(shifts_need_assigment) == 0:
        return isValid(individual)

    # Take the first shift from the list
    shift = shifts_need_assigment[0]
    # Try assigning this shift to each worker
    for worker in workers:
            # Assign the shift to the worker
            if worker not in individual:
                individual[worker] = []
            if shift[0] in worker[2] and shift not in individual[worker]:
                individual[worker].append(shift)
                break

        # Recur to assign the remaining shifts
    if backtrack(individual):
        return True

        # Backtrack: remove the shift from the worker
    individual[worker].remove(shift)
    if not individual[worker]:
        del individual[worker]

    return False

def init_individual():
    """
    This function generates a valid schedule.
    It uses the backtrack function to generate a valid schedule.
    If the backtrack function cannot generate a valid schedule after 10 attempts, it stops and returns an empty list.
    :return: dictioary
    """
    individual = {}
    attempts = 0
    while not backtrack(individual):
        individual = {}
        attempts += 1
        # Limit the attempts to avoid infinite loops
        if attempts > 10:
            break
    return individual

def evaluate(individual):
    """
    this fitness function sum the cost of the day
    a day get a fee of 1000 for each shift that doesnt have enough workers
    :param individual
    :return: tuple with a single element, which is the imbalance measure of the schedule
    """
    total_cost = 0
    shift_count = {}

    # Count the number of workers for each shift
    for shifts in individual.values():
        for shift in shifts:
            shift_tuple = tuple(shift[:5])  # Use (skill, day, start_hour, end_hour, number_of_workers) as the key
            if shift_tuple not in shift_count:
                shift_count[shift_tuple] = 0
            shift_count[shift_tuple] += 1
            total_cost += shift[5]  # Add cost_per_worker to total cost

    # Check if any shift doesn't have enough workers
    for shift in shift_count:
        required_workers = shift[4]  # Extract number_of_workers
        if shift_count[shift] < required_workers:
            total_cost += 1000  # Add penalty fee for insufficient workers

    return total_cost


def mutate_individual(individual, shifts):
    """
    This function mutates a schedule.
    Mutation is an evolutionary operator that introduces diversity in the population.
    It randomly selects a worker and changes his shifts for this day.
    If the new schedule is not valid, it tries again up to 10 times.
    :param individual: dic of shifts and assigment of one day
       for example: { first_worker : [shift1, shift2] , ...}
       shifts looks like : [skill,day,start_hour,end_hour,number_of_workers,cost_per_worker]
       worker looks like : worker_id,name,skill1,skill2,skill3
    :param shifts: list of the shifts
    :return: tuple with a single element, which is the mutated schedule
    """
    # Create a copy of the individual to mutate
    new_individual = {worker: shifts[:] for worker, shifts in individual.items()}

    for _ in range(10):
        # Randomly select a worker
        worker = random.choice(list(new_individual.keys()))
        # Randomly select a new set of shifts for this worker
        new_shifts = random.sample(shifts, len(new_individual[worker]))
        # Assign the new shifts to the worker
        new_individual[worker] = new_shifts

        # Check if the new schedule is valid
        if isValid(new_individual):
            return (new_individual,)

    return (individual,)  # If no valid mutation is found, return the original individual


def setup_toolbox():
    """
    This function sets up the DEAP toolbox.
    It registers the functions for creating individuals and populations, and for the evolutionary operators.
    """
    global toolbox

    # Reset the toolbox
    toolbox = base.Toolbox()

    # Register the functions
    toolbox.register("individual", tools.initIterate, creator.Individual, init_individual)
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)
    toolbox.register("mate", tools.cxTwoPoint)
    toolbox.register("mutate", mutate_individual)
    toolbox.register("select", tools.selTournament, tournsize=3)
    toolbox.register("evaluate", evaluate)


def optimize_schedule( population_size, generations ):
    """
    This function optimizes a shift schedule.
    It uses a genetic algorithm to find the best schedule.
    The algorithm evolves a population of schedules over a number of generations.
    In each generation, it selects the best schedules, applies crossover and mutation, and creates a new population.
    :param generations: number of generations of the population
    :param population_size: size of the population
    :return: list of weeks, where each week is a list of three names representing the workers
    """

    setup_toolbox()

    pop = toolbox.population(n=population_size)
    CXPB, MUTPB, NGEN = 0.7, 0.2, generations

    fitnesses = list(map(toolbox.evaluate, pop))
    for ind, fit in zip(pop, fitnesses):
        ind.fitness.values = fit

    for gen in range(NGEN):
        print(f"-- Generation {gen} --")

        offspring = toolbox.select(pop, len(pop))
        offspring = list(map(toolbox.clone, offspring))

        # Crossover
        for child1, child2 in zip(offspring[::2], offspring[1::2]):
            if random.random() < CXPB:
                toolbox.mate(child1, child2)
                del child1.fitness.values
                del child2.fitness.values

        # Mutation
        for mutant in offspring:
            if random.random() < MUTPB:
                toolbox.mutate(mutant)
                del mutant.fitness.values

        # Check and correct invalid schedules
        for child in offspring:
            if not isValid(child):
                child[:] = init_individual()

        # Evaluate the schedules after crossover and mutation
        invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
        fitnesses = map(toolbox.evaluate, invalid_ind)
        for ind, fit in zip(invalid_ind, fitnesses):
            ind.fitness.values = fit

        # Update the population
        pop[:] = offspring

    best_ind = tools.selBest(pop, 1)[0]


    return best_ind


def main():
    pop = toolbox.population(n=300)
    hof = tools.HallOfFame(1)
    stats = tools.Statistics(lambda ind: ind.fitness.values)
    stats.register("avg", lambda x: sum([ind[0] for ind in x]) / len(x))
    stats.register("min", min)
    stats.register("max", max)

    algorithms.eaSimple(pop, toolbox, cxpb=0.7, mutpb=0.2, ngen=40, stats=stats, halloffame=hof, verbose=True)

    best_individual = hof[0]
    assignment = []
    for shift_idx, worker_idx in enumerate(best_individual):
        assignment.append({
            'shift_index': shift_idx,
            'worker_id': workers_df.iloc[worker_idx]['worker_id'],
            'worker_name': workers_df.iloc[worker_idx]['name']
        })

    # Create a DataFrame for the assignment
    assignment_df = pd.DataFrame(assignment)

    # Merge with shift information
    final_assignment_df = pd.merge(assignment_df, shifts_df, left_on='shift_index', right_index=True)

    # Save the results to a CSV file
    final_assignment_df.to_csv('shift_assignments.csv', index=False)
    print("Shift assignments saved to 'shift_assignments.csv'")


if __name__ == "__main__":
    # individual = {
    #     'worker1': [['skill1', 'Monday', 9, 12, 1, 10], ['skill2', 'Monday', 13, 17, 1, 15]],
    #     'worker2': [['skill3', 'Monday', 10, 14, 1, 12]]
    # }
    #
    # print(isValid(individual))

    # Example usage:
    # shifts = [['skill1', 'Monday', 9, 12, 2, 10], ['skill2', 'Monday', 13, 17, 1, 15],
    #           ['skill3', 'Monday', 10, 14, 1, 12]]
    # worker1 = (1, "Worker1", ('skill1', 'skill2'))
    # worker2 = (2, "Worker2", ('skill1'))
    # worker3 = (3, "Worker3", ('skill2'))
    # workers = (worker1, worker2, worker3)
    #
    # individual = {}
    #
    # if backtrack(individual, shifts, workers):
    #     print("Valid schedule found:", individual)
    # else:
    #     print("No valid schedule found.")
    #
    # individual = {
    #     (1, 'Alice', ('skill1', 'skill2')): [['skill1', 'Monday', 9, 12, 2, 10]],
    #     (2, 'Bob', ('skill1', 'skill3')): [['skill2', 'Monday', 13, 17, 1, 15]],
    #     (3, 'Charlie', ('skill2', 'skill3')): [['skill3', 'Monday', 10, 14, 1, 12]]
    # }
    #
    # evaluation_result = evaluate(individual)
    # print("Evaluation result:", evaluation_result)
    #
    # shifts = [['skill1', 'Monday', 9, 12, 1, 10], ['skill2', 'Monday', 13, 17, 1, 15],
    #           ['skill3', 'Monday', 10, 14, 1, 12]]
    # workers = [
    #     (1, 'Alice', ('skill1', 'skill2')),
    #     (2, 'Bob', ('skill1', 'skill3')),
    #     (3, 'Charlie', ('skill2', 'skill3'))
    # ]
    # individual = {
    #     workers[0]: [['skill1', 'Monday', 9, 12, 1, 10]],
    #     workers[1]: [['skill1', 'Monday', 13, 17, 1, 15]],
    #     workers[2]: [['skill3', 'Monday', 10, 14, 1, 12]]
    # }
    #
    # mutated_individual = mutate_individual(individual, shifts)
    # print("Mutated individual:", mutated_individual)
    # Run the optimization
    best_schedule = optimize_schedule(population_size=50, generations=100)
    print("Best schedule found:")
    print(best_schedule)