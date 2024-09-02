const { addDays } = require('date-fns');
const { spawn } = require('child_process');

const daysToNumbers = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
};

function runPythonScript(workers, shifts) {
    return new Promise((resolve, reject) => {
        const childPython = spawn('python', ['../algorithem/genetic_algorithem_list.py']);

        let output = '';
        let error = '';

        childPython.stdout.on('data', (data) => {
            output += data.toString();
        });

        childPython.stderr.on('data', (data) => {
            error += data.toString();
        });

        childPython.on('error', (err) => {
            reject(err);
        });

        childPython.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Child process exited with code ${code}\n${error}`));
            } else {
                // console.log('Raw output:', output); // Log the raw output for debugging
                try {
                    const parsedOutput = JSON.parse(output);
                    const result = parsedOutput.result;
                    resolve(result);
                } catch (e) {
                    reject(new Error(`Failed to parse JSON output: ${e.message}`));
                }
            }
        });

        const inputData = JSON.stringify({ workers, shifts });
        childPython.stdin.write(inputData);
        childPython.stdin.end();
    });
}

function splitShiftsByDay(shifts) {
    // Initialize days of the week with empty arrays
    const days = {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
    };

    // Populate the days with the provided shifts
    shifts.forEach(shift => {
        const day = shift.day;
        if (days[day]) {
            days[day].push(shift);
        }
    });

    return days;
}

async function processAllDays(days, workers) {
    const daysOfWeek = Object.keys(days);
    const results = {};

    for (const day of daysOfWeek) {
        len = days[day].length
        if (len > 0) {
            try {
                const result = await runPythonScript(workers, days[day]);
                results[day] = result;
                console.log(`Best schedule for ${day}:`, result);
            } catch (error) {
                console.error(`Error processing ${day}:`, error);
            }
        }
    }

    return results;
}

function sortByDay(shifts) {
    const days = {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
    };

    shifts.forEach(shift => {
        const { day } = shift;

        if (!days[day]) {
            days[day] = [];
        }

        days[day].push(shift);
    });

    const allShifts = [];

    // Iterate over each day in the days object
    Object.values(days).forEach(shifts => {
        // Concatenate shifts of each day into allShifts array
        allShifts.push(...shifts);
    });

    return allShifts;
}

function functionFix(results) {
    /*I have now like this:
    {
        monday:[[], [], ...]
        Tuesday: [[ 1, 41 ],...]
        ...
    }
    to put to each number in the days the actuall number of the shift
    */
        const daysOfWeek = Object.keys(results);
        
        // Iterate through the days from Sunday to Saturday
        for (let i = 0; i < daysOfWeek.length - 1; i++) {
            const currentDay = daysOfWeek[i];
            const nextDay = daysOfWeek[i + 1];
            
            // Find the maximum number in the next day's array
            const maxtDay = Math.max(...results[currentDay].flat());
    
            // Add the maximum number of the next day to all numbers in the current day
            results[nextDay] = results[nextDay].map(shift => {
                return shift.map(num => num + maxtDay+1);
            });
        }
        
        // Return the modified days object
        return results;
}

function combineShifts(results) {
    // Initialize an array to store combined shifts
    const combinedShifts = [];
  
    const days = Object.keys(results);
    
    const shiftsLength = results.Monday.length;//how many workers 
  
    // Iterate through each index 'i' across all days
    for (let i = 0; i < shiftsLength; i++) {
      // Create an array to hold shifts for index 'i' across all days
      const shiftsAtI = [];
  
      // Iterate through each day
      for (const day of days) {
        // Check if the current day has shifts at index 'i'
        if (results[day][i]) {
          // Concatenate the shifts at index 'i' from current day to shiftsAtI
          shiftsAtI.push(...results[day][i]);
        } else {
          // If no shifts at index 'i' for the current day, push an empty array
          shiftsAtI.push([]);
        }
      }
  
      // Push shiftsAtI into combinedShifts
      combinedShifts.push(shiftsAtI);
    }
  
    return combinedShifts;
  }

//   function isWorkerAvailable(worker, shift, allShifts) {
//     const shiftStart = parseTime(shift.shiftStartTime);
//     const shiftEnd = parseTime(shift.shiftEndTime);
//     const shiftDate = shift.shiftDate
//     // Check if worker is already assigned to a conflicting shift
//     for (const otherShift of allShifts) {
//       if (otherShift.workers.some(w => w.id === worker.id)) {
//         const otherShiftStart = parseTime(otherShift.shiftStartTime);
//         const otherShiftEnd = parseTime(otherShift.shiftEndTime);
//         const otherShiftDate = otherShift.shiftDate;

//         if ((otherShiftDate===shiftDate && shiftStart < otherShiftEnd && shiftEnd > otherShiftStart) || 
//             (otherShiftDate===shiftDate && shiftEnd > otherShiftStart && shiftStart < otherShiftEnd)||
//             (otherShiftDate===shiftDate && shiftStart > otherShiftStart && shiftEnd < otherShiftEnd))
//              {
//           return false;
//         }
//       }
//     }
//     return true;
//   }

function isWorkerInList(worker, workersList) {
    return workersList.some(w => w.id === worker.id);
  }

function isWorkerAvailable(worker, shift, allShifts) {
    const shiftStart = parseTime(shift.shiftStartTime);
    const shiftEnd = parseTime(shift.shiftEndTime);
    const shiftDate = shift.shiftDate
  
    console.log("Checking availability for worker:", worker);
    console.log("Shift date:", shiftDate, "Shift start:", shiftStart, "Shift end:", shiftEnd);
  
    // Check if worker is already assigned to a conflicting shift
    for (const otherShift of allShifts) {
      if (isWorkerInList(worker, otherShift.workers)) {
        const otherShiftStart = parseTime(otherShift.shiftStartTime);
        const otherShiftEnd = parseTime(otherShift.shiftEndTime);
        const otherShiftDate = otherShift.shiftDate
        console.log("Comparing with other shift:");
        console.log("Other shift date:", otherShiftDate, "Other shift start:", otherShiftStart, "Other shift end:", otherShiftEnd);
  
        if (otherShiftDate.getTime() === shiftDate.getTime() && 
            shiftStart < otherShiftEnd && shiftEnd > otherShiftStart) {
          console.log("Conflict found for worker:", worker.id);
          return false; // Conflict found, worker is not available
        }
      }
    }
    return true; // No conflicts, worker is available
  }

  function parseTime(time, ) {
    const [hours, minutes] = time.split(':');

    return new Date(0, 0, 0, hours, minutes);
  }  

  function findReplaceableWorkers(shifts, workers) {
    return shifts.map(shift => {
      const requiredSkill = shift.skill;
  
      const replaceableWorkers = [];
      
      for (const worker of workers) {
        
            if (worker.skills.includes(requiredSkill)) {
          if (isWorkerAvailable(worker, shift, shifts)) {
            replaceableWorkers.push(worker);
          }
        
        }
        
      }
  
      shift.replaceableWorkers = replaceableWorkers;
      
      return shift; 
    });
  }

const processShift = async (shifts, workers, organizationId, startOfTheWeek) => {
    try {
        shifts= sortByDay(shifts)// sort
        //console.log(shifts)
        const days = await splitShiftsByDay(shifts)
        // I have now 
        // days.day for each day 
        
        const results = await processAllDays(days, workers);

        //console.log("Result from Python script:", results);

        const newResult = functionFix(results);
        //console.log(newResult)
        const result=combineShifts(newResult)


        result.forEach((workerShifts, workerIndex) => {
            const worker = workers[workerIndex];
            workerShifts.forEach((shiftIndex) => {
                if (shifts[shiftIndex]) {
                    if (!shifts[shiftIndex].workers) {
                        shifts[shiftIndex].workers = [];
                    }
                    shifts[shiftIndex].workers.push(worker);
                }
            });
        });

        schedulee = shifts.map((shift) => {
            const shiftDate = addDays(startOfTheWeek, daysToNumbers[shift.day]);
            return {
                organizationId,
                shiftDate,
                week: startOfTheWeek,
                shiftStartTime: shift.start_hour,
                shiftEndTime: shift.end_hour,
                workers: shift.workers,
                replaceableWorkers: [],
                skill: shift.skill,
            };
        });

        
        schedulee= await findReplaceableWorkers(schedulee, workers) 
        console.log(schedulee)
        return schedulee
    } catch (error) {
        console.error("Failed to process shifts:", error);
        throw new Error(`Failed to process shifts: ${error.message}`);
    }
};

module.exports = {
    processShift
};
