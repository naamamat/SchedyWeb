import pandas as pd
import random
from deap import base, creator, tools, algorithms
import sys
import json 
import ast

input_data = sys.stdin.read()
data = json.loads(input_data)
    
workers = data.get('workers', [])
shifts = data.get('shifts', [])

shifts_list = [
    (
        entry['skill'],
        entry['day'],
        entry['start_hour'],
        entry['end_hour'],
        int(entry['number_of_workers']),
        int(entry['cost_per_worker'])
    )
    for entry in shifts
]

workers_list = [
    (
        int(entry['id']),  # Adjust the id as needed
        entry['fullName'].replace('Worker', 'Worker'),  # Adjust the name as needed
        tuple(entry['skills'])
    )
    for entry in workers
]

workers=workers_list
shifts=shifts_list

# Prepare data
shift_count = len(shifts)
worker_count = len(workers)

# Genetic Algorithm setup

creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)

toolbox = base.Toolbox()
"""
Individual: A list of integers.
 Each integer represents a worker assigned to a shift.
 The position of the integer in the list corresponds to the shift index.
In this example:
individual = [
    [0, 1],  # Worker 0 is assigned to Shifts 0 and 1
    [2, 3],  # Worker 1 is assigned to Shifts 2 and 3
    [4, 0]   # Worker 2 is assigned to Shifts 4 and 0
]

"""
def isValid(individual):
    for worker_idx, worker_shifts in enumerate(individual):
        shift_times = [(shifts[shift_idx][2], shifts[shift_idx][3]) for shift_idx in worker_shifts]
        for i in range(len(shift_times)):
            for j in range(i + 1, len(shift_times)):
                start1, end1 = shift_times[i]
                start2, end2 = shift_times[j]
                if not (end1 <= start2 or end2 <= start1):
                    return False

        worker_skills = set(workers[worker_idx][2])
        for shift_idx in worker_shifts:
            if shifts[shift_idx][0] not in worker_skills:
                return False

    return True

def backtrack(individual):
    SKILL=0
    shifts_assigned = {shift_idx: 0 for shift_idx in range(len(shifts))}

    for worker_shifts in individual:# worker_sifts = [ , , ]
        for shift_idx in worker_shifts:
            shifts_assigned[shift_idx] += 1

    shifts_need_assignment = []

    for shift_idx, count in shifts_assigned.items():
            shifts_need_assignment.append((shift_idx, shifts[shift_idx][4] - count))

    flag = True
    for (id, count) in shifts_need_assignment:
        if count>0:
            flag=False

    if flag:
        return True

    for worker_idx in range(len(individual)):
        for (shift_idx, open_places) in shifts_need_assignment:
            if (shifts[shift_idx][0] in workers[worker_idx][2]
                    and shift_idx not in individual[worker_idx]
            and shifts_need_assignment[shift_idx][1]>0):
                individual[worker_idx].append(shift_idx)
                shifts_need_assignment[shift_idx]=(shift_idx, open_places-1)
                break

    if backtrack(individual):
            return True

    individual[worker_idx].remove(shift_idx)

    return False

def init_individual():
    individual = [[] for _ in range(len(workers))]
    attempts = 0
    while not backtrack(individual):
        individual = [[] for _ in range(len(workers))]
        attempts += 1
        if attempts > 10:
            break
    return individual

def evaluate(individual):
    total_cost = 0
    shifts_assigned = {shift_idx: 0 for shift_idx in range(len(shifts))}

    for worker_idx, worker_shifts in enumerate(individual):
        for shift in worker_shifts:
            shifts_assigned[shift] += 1
            total_cost += shifts[shift][5]  # Add cost_per_worker to total cost

    for shift_idx, count in shifts_assigned.items():
        required_workers = shifts[shift_idx][4]
        if count < required_workers:
            total_cost += 1000

    return (total_cost,)

def mutate_individual(individual, shifts):
    new_individual = [shifts[:] for shifts in individual]
    for _ in range(10):
        worker_idx = random.choice(range(len(individual)))
        if len(new_individual[worker_idx]) > 0:
            shift_to_remove = random.choice(new_individual[worker_idx])
            new_individual[worker_idx].remove(shift_to_remove)

        new_shift = random.choice(range(len(shifts)))
        if (new_shift not in new_individual[worker_idx]):
            new_individual[worker_idx].append(new_shift)

        if isValid(new_individual):
            return (new_individual,)

    return (individual,)

def initialize_population(population_size, num_workers, num_shifts):
    population = []
    for _ in range(population_size):
        individual = [[] for _ in range(num_workers)]
        for shift_idx in range(num_shifts):
            assigned = False
            while not assigned:
                worker_idx = random.randint(0, num_workers - 1)
                worker_skills = workers[worker_idx][2]
                shift_skill = shifts[shift_idx][0]
                if shift_skill in worker_skills:
                    individual[worker_idx].append(shift_idx)
                    assigned = True
        population.append(individual)
    return population

def setup_toolbox():
    global toolbox
    toolbox = base.Toolbox()
    toolbox.register("individual", tools.initIterate, creator.Individual, init_individual)
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)
    toolbox.register("mate", tools.cxTwoPoint)
    toolbox.register("mutate", mutate_individual)
    toolbox.register("select", tools.selTournament, tournsize=3)
    toolbox.register("evaluate", evaluate)

def optimize_schedule(population_size, generations):
    setup_toolbox()
    pop = toolbox.population(n=population_size)
    CXPB, MUTPB, NGEN = 0.7, 0.2, generations

    fitnesses = list(map(toolbox.evaluate, pop))
    for ind, fit in zip(pop, fitnesses):
        ind.fitness.values = fit

    for gen in range(NGEN):

        offspring = toolbox.select(pop, len(pop))
        offspring = list(map(toolbox.clone, offspring))

        for child1, child2 in zip(offspring[::2], offspring[1::2]):
            if random.random() < CXPB:
                toolbox.mate(child1, child2)
                del child1.fitness.values
                del child2.fitness.values

        for mutant in offspring:
            if random.random() < MUTPB:
                toolbox.mutate(mutant, shifts)
                del mutant.fitness.values

        invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
        fitnesses = map(toolbox.evaluate, invalid_ind)
        for ind, fit in zip(invalid_ind, fitnesses):
            ind.fitness.values = fit

        pop[:] = offspring

    best_ind = tools.selBest(pop, 1)[0]
    return best_ind

if __name__ == "__main__":
    best_schedule = optimize_schedule(population_size=50, generations=100)
    #print("Best schedule found:")
    print(json.dumps({'result': best_schedule, 'workers': workers, 'shifts': shifts}))

