

// import React from 'react';
// import { format } from 'date-fns';
// import UserTableOptions from './userTableOptions';
// import { ReplaceableWorkersDropdown } from './replaceableWorkersDropdown';
// import axiosInstance from '../../context/axios';
// import { ORG_ID } from '../../consts';

// function TableShift({ schedule, days, filterFullName, sortOrder, selectedPosition, refreshSchedule }) {

//   const onAddWorker = async (worker, shiftId) => {
//     try {
//       const body = {
//         shiftId, workerId: worker.id, organizationId: ORG_ID
//       };
//       await axiosInstance.post('/addWorker', body);
//       refreshSchedule();
//     } catch (e) {
//       alert("Could not add worker. Please try again.");
//     }
//   };

//   const onDeleteWorker = async (worker, shiftId) => {
//     try {
//       const body = {
//         shiftId, workerId: worker.id, organizationId: ORG_ID
//       };
//       await axiosInstance.post('/removeWorker', body);
//       refreshSchedule();
//     } catch (e) {
//       alert("Could not delete worker. Please try again.");
//     }
//   };

//   const onReplaceWorker = async (newWorker, oldWorker, shiftId) => {
//     try {
//       const body = {
//         shiftId, newWorkerId: newWorker.id, oldWorkerId: oldWorker.id, organizationId: ORG_ID
//       };
//       await axiosInstance.post('/replace', body);
//       refreshSchedule();
//     } catch (e) {
//       alert("Could not replace worker. Please try again.");
//     }
//   };

//   const filterWorkers = (workers) => {
//     if (!filterFullName) return workers; // Show all workers if no filter
//     return workers.filter(worker => worker.fullName.toLowerCase().includes(filterFullName.toLowerCase()));
//   };

//   // Sorting the schedule by shift startTime
//   const sortedSchedule = Object.entries(schedule).sort(([keyA, rowDataA], [keyB, rowDataB]) => {
//     const timeA = rowDataA.startTime;
//     const timeB = rowDataB.startTime;
//     return sortOrder === "asc" ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
//   });

//   // Filtering the schedule by selected position (skill)
//   const filteredSchedule = sortedSchedule.filter(([key, rowData]) => {
//     if (!selectedPosition) return true; // If no position is selected, show all rows
//     return rowData.skill === selectedPosition; // Only show rows where the skill matches the selected position
//   });

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th className='td-shift'>Shift</th>
//           <th className='td-shift'>Position</th>
//           {days.map((day, index) => (
//             <th key={`${day}-${index}-column`}>
//               <div className="td-day">
//                 <h1 className="Font-big">{format(new Date(day), 'd')}</h1>
//                 <h4 className="Font-small">{format(new Date(day), 'EEEE')}</h4>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {filteredSchedule.map(([key, rowData], index) => (
//           <tr key={`${key}-row`}>
//             <td className='td-shift'>{rowData.startTime} - {rowData.endTime}</td>
//             <td className='td-shift'>{rowData.skill}</td>
//             {days.map((day) => {
//               const filteredWorkers = filterWorkers(rowData[day] || []); // Filter workers by fullName for the day
//               return (
//                 <td key={`${day}-${key}-row`} style={{ textAlign: "center" }}>
//                   {filteredWorkers.length > 0 ? (
//                     filteredWorkers.map((worker) => (
//                       <UserTableOptions
//                         key={worker.id}
//                         rowData={rowData}
//                         currentWorker={worker}
//                         onDelete={(worker) => onDeleteWorker(worker, rowData.id)}
//                         onReplace={(newWorker) => onReplaceWorker(newWorker, worker, rowData.id)}
//                       />
//                     ))
//                   ) : (
//                     // Render an empty cell if no workers match for that day
//                     <div style={{ height: '50px' }}></div>
//                   )}
//                 </td>
//               );
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default TableShift;














// import React from 'react';
// import { format } from 'date-fns';
// import UserTableOptions from './userTableOptions';
// import { ReplaceableWorkersDropdown } from './replaceableWorkersDropdown';
// import axiosInstance from '../../context/axios';
// import { ORG_ID } from '../../consts';

// function TableShift({ schedule, days, filterFullName, refreshSchedule }) {

//   const onAddWorker = async (worker, shiftId) => {
//     try {
//       const body = {
//         shiftId, workerId: worker.id, organizationId: ORG_ID
//       };
//       await axiosInstance.post('/addWorker', body);
//       refreshSchedule();
//     } catch (e) {
//       alert("Could not add worker. Please try again.");
//     }
//   };

//   const onDeleteWorker = async (worker, shiftId) => {
//     try {
//       const body = {
//         shiftId, workerId: worker.id, organizationId: ORG_ID
//       };
//       await axiosInstance.post('/removeWorker', body);
//       refreshSchedule();
//     } catch (e) {
//       alert("Could not delete worker. Please try again.");
//     }
//   };

//   const onReplaceWorker = async (newWorker, oldWorker, shiftId) => {
//     try {
//       const body = {
//         shiftId, newWorkerId: newWorker.id, oldWorkerId: oldWorker.id, organizationId: ORG_ID
//       };
//       await axiosInstance.post('/replace', body);
//       refreshSchedule();
//     } catch (e) {
//       alert("Could not replace worker. Please try again.");
//     }
//   };

//   const filterWorkers = (workers) => {
//     if (!filterFullName) return workers; // Show all workers if no filter
//     return workers.filter(worker => worker.fullName.toLowerCase().includes(filterFullName.toLowerCase()));
//   };

//   // New function: Filters out rows (shifts) that have no matching workers
//   const filterShifts = (schedule) => {
//     return Object.entries(schedule).reduce((filtered, [key, rowData]) => {
//       const filteredRowData = { ...rowData };
//       const hasMatchingWorkers = days.some((day) => {
//         const filteredWorkers = filterWorkers(filteredRowData[day] || []);
//         if (filteredWorkers.length > 0) {
//           filteredRowData[day] = filteredWorkers;
//           return true;
//         }
//         return false;
//       });
//       if (hasMatchingWorkers) {
//         filtered[key] = filteredRowData; // Only keep rows with matching workers
//       }
//       return filtered;
//     }, {});
//   };

//   const filteredSchedule = filterShifts(schedule);

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th className='td-shift'>Shift</th>
//           <th className='td-shift'>Position</th>
//           {days.map((day, index) => (
//             <th key={`${day}-${index}-column`}>
//               <div className="td-day">
//                 <h1 className="Font-big">{format(new Date(day), 'd')}</h1>
//                 <h4 className="Font-small">{format(new Date(day), 'EEEE')}</h4>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {Object.entries(filteredSchedule).map(([key, rowData], index) => (
//           <tr key={`${key}-row`}>
//             <td className='td-shift'>{rowData.startTime} - {rowData.endTime}</td>
//             <td className='td-shift'>{rowData.skill}</td>
//             {days.map((day) => {
//               const filteredWorkers = filterWorkers(rowData[day] || []); // Filter for the day
//               return (
//                 <td key={`${day}-${key}-row`} style={{ textAlign: "center" }}>
//                   {filteredWorkers.length > 0 ? (
//                     filteredWorkers.map((worker) => (
//                       <UserTableOptions
//                         key={worker.id}
//                         rowData={rowData}
//                         currentWorker={worker}
//                         onDelete={(worker) => onDeleteWorker(worker, rowData.id)}
//                         onReplace={(newWorker) => onReplaceWorker(newWorker, worker, rowData.id)}
//                       />
//                     ))
//                   ) : (
//                     // Render an empty cell if no workers match for that day
//                     <div style={{ height: '50px' }}></div>
//                   )}
//                 </td>
//               );
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default TableShift;




import React from 'react';
import { format } from 'date-fns';
import UserTableOptions from './userTableOptions';
import { ReplaceableWorkersDropdown } from './replaceableWorkersDropdown.js';
import axiosInstance from '../../context/axios';
import { useUserContext } from '../../context/UserProvider.jsx';

function TableShift({ schedule, days, filterFullName, sortOrder, selectedPosition, refreshSchedule }) {
  const { user } = useUserContext();
  const filterWorkers = (workers) => {
    if (!filterFullName) return workers; // Show all workers if no filter
    return workers.filter(worker => worker.fullName.toLowerCase().includes(filterFullName.toLowerCase()));
  };

    const onDeleteWorker = async (worker, shiftId) => {
    try {
      const body = {
        shiftId, workerId: worker.id, organizationId: user.orgId,
      };
      await axiosInstance.post('/removeWorker', body);
      refreshSchedule();
    } catch (e) {
      alert("Could not delete worker. Please try again.");
    }
  };

  const onReplaceWorker = async (newWorker, oldWorker, shiftId) => {
    try {
      const body = {
        shiftId, newWorkerId: newWorker.id, oldWorkerId: oldWorker.id, organizationId: user.orgId,
      };
      await axiosInstance.post('/replace', body);
      refreshSchedule();
    } catch (e) {
      alert("Could not replace worker. Please try again.");
    }
  };

  const onAddWorker = async (worker, shiftId) => {
    try {
      const body = {
        shiftId, workerId: worker.id, organizationId: user.orgId,
      };
      await axiosInstance.post('/addWorker', body);
      refreshSchedule();
    } catch (e) {
      alert("Could not add worker. Please try again.");
    }
  }

  const filterShifts = (schedule) => {
    return Object.entries(schedule).reduce((filtered, [key, rowData]) => {
      const filteredRowData = { ...rowData };

      // Filter shifts by position
      if (selectedPosition && rowData.skill !== selectedPosition) {
        return filtered; // Skip shifts that don't match the selected position
      }

      // Filter workers within each shift
      const hasMatchingWorkers = days.some((day) => {
        const filteredWorkers = filterWorkers(filteredRowData[day] || []);
        if (filteredWorkers.length > 0) {
          filteredRowData[day] = filteredWorkers;
          return true;
        }
        return false;
      });

      if (hasMatchingWorkers) {
        filtered[key] = filteredRowData; // Only keep rows with matching workers
      }
      return filtered;
    }, {});
  };

  // Sort shifts by startTime
  const sortShifts = (filteredSchedule) => {
    return Object.entries(filteredSchedule).sort(([keyA, rowA], [keyB, rowB]) => {
      const startTimeA = new Date(`1970-01-01T${rowA.startTime}:00`).getTime();
      const startTimeB = new Date(`1970-01-01T${rowB.startTime}:00`).getTime();

      if (sortOrder === 'asc') {
        return startTimeA - startTimeB;
      } else {
        return startTimeB - startTimeA;
      }
    });
  };

  const filteredSchedule = filterShifts(schedule);
  const sortedSchedule = sortShifts(filteredSchedule); // Sort after filtering

  return (
    <table className="table">
      <thead>
        <tr>
          <th className='td-shift'>Shift</th>
          <th className='td-shift'>Position</th>
          {days.map((day, index) => (
            <th key={`${day}-${index}-column`}>
              <div className="td-day">
                <h1 className="Font-big">{format(new Date(day), 'd')}</h1>
                <h4 className="Font-small">{format(new Date(day), 'EEEE')}</h4>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedSchedule.map(([key, rowData]) => (
          <tr key={`${key}-row`}>
            <td className='td-shift'>{rowData.startTime} - {rowData.endTime}</td>
            <td className='td-shift'>{rowData.skill}</td>
            {days.map((day) => {
              const filteredWorkers = filterWorkers(rowData[day] || []); // Filter workers per day
              return (
                <td key={`${day}-${key}-row`} style={{ textAlign: "center" }}>
                  {filteredWorkers.length > 0 ? (
                    filteredWorkers.map((worker) => (
                      <UserTableOptions
                        key={worker.id}
                        rowData={rowData}
                        currentWorker={worker}
                        onDelete={(worker) => onDeleteWorker(worker, rowData.id)}
                        onReplace={(newWorker) => onReplaceWorker(newWorker, worker, rowData.id)}
                      />
                    ))
                  ) : (
                    <div style={{ height: '50px' }}></div>
                  )}

                  {rowData[day]?.length > 0 &&
                  <ReplaceableWorkersDropdown
                    replaceableWorkers={rowData?.replaceableWorkers}
                    onEdit={(worker) => onAddWorker(worker, rowData.id)}
                  >
                      <button>+</button>
                  </ReplaceableWorkersDropdown>}

                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableShift;




