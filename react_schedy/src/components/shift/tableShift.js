// import React from 'react';
// import { format } from 'date-fns';
// import UserTableOptions from './userTableOptions';
// import { ReplaceableWorkersDropdown } from './replaceableWorkersDropdown';
// import axiosInstance from '../../context/axios';
// import { ORG_ID } from '../../consts';

// // Object.keys({1: a, 2: b, 3: c}) => ["1", "2", "3"]
// // Object.values({1: a, 2: b, 3: c}) => ["a",b", "c"]
// // Object.entries({1: a, 2: b, 3: c}) => [["1", "a"], ["2", "b"], ["3", "c"]]
// // Object.entries({`${start}-{end}-{skill}}) => [["startednskill", [schedules]],...]

// function TableShift({ schedule, days, refreshSchedule }) {

//   const onAddWorker = async (worker, shiftId) => {
//     try {
//       const body = {
//          shiftId, workerId: worker.id, organizationId: ORG_ID
//       }
//       await axiosInstance.post(`/addWorker`, body);
//       refreshSchedule();
//     } catch(e) {
//       alert("Could not add worker. please try again.");
//     }
//   }

//   const onDeleteWorker = async (worker, shiftId) => {
//     try {
//       const body = {
//          shiftId, workerId: worker.id, organizationId: ORG_ID
//       }
//       await axiosInstance.post(`/removeWorker`, body);
//       refreshSchedule();
//     } catch(e) {
//       alert("Could not delete worker. please try again.");
//     }
//   }

//   const onReplaceWorker = async (newWorker, oldWorker, shiftId) => {
//     try {
//       const body = {
//          shiftId, newWorkerId: newWorker.id, oldWorkerId: oldWorker.id, organizationId: ORG_ID
//       }
//       await axiosInstance.post(`/replace`, body);
//       refreshSchedule();
//     } catch(e) {
//       alert("Could not replace worker. please try again.");
//     }
//   }

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th className='td-shift'>Shift</th>
//           <th className='td-shift' >Position</th>
//           {days.map((day, index) => (
//             <th key={`${day}-${index}-column`}>
//               <div className="td-day">
//                 <h1 className="Font-big">{format(new Date(day), 'd')}</h1>
//                 <h4 className="Font-small">
//                   {format(day, 'EEEE')}
//                 </h4>
//               </div>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {Object.entries(schedule).map(([key, rowData], index) => (
//           <tr key={`${key}-row`}>
//             <td className='td-shift'>{rowData.startTime} - {rowData.endTime}</td>
//             <td className='td-shift'>{rowData.skill}</td>
//             {days.map((day) => (
//               <td key={`${day}-${key}-row`} style={{ textAlign: "center" }} >
//                 {rowData[day]?.map((worker) => (
//                   <UserTableOptions
//                     rowData={rowData}
//                     currentWorker={worker}
//                     onDelete={(worker) => onDeleteWorker(worker, rowData.id)}
//                     onReplace={(newWorker) => onReplaceWorker(newWorker, worker, rowData.id)}
//                   />))}

//                 {rowData[day]?.length > 0 &&
//                   <ReplaceableWorkersDropdown replaceableWorkers={rowData.replaceableWorkers} onEdit={(worker) => onAddWorker(worker, rowData.id)}>
//                     <button>+</button>
//                   </ReplaceableWorkersDropdown>}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// /*
// {
//     "_id": "6687c7502f9895708d80110c",
//     "organizationId": "12345",
//     "week": "2024-07-06T21:00:00.000Z",
//     "shiftDate": "2024-07-07T21:00:00.000Z",
//     "shiftStartTime": "06:00",
//     "shiftEndTime": "17:00",
//     "workers": [
//         {
//             "id": "15",
//             "fullName": "Worker15",
//             "skills": [
//                 "skill3",
//                 "skill4"
//             ],
//             "_id": "6687c7502f9895708d80110d"
//         },
//         {
//             "id": "31",
//             "fullName": "Worker31",
//             "skills": [
//                 "skill8",
//                 "skill10",
//                 "skill3"
//             ],
//             "_id": "6687c7502f9895708d80110e"
//         },
//         {
//             "id": "35",
//             "fullName": "Worker35",
//             "skills": [
//                 "skill6",
//                 "skill7",
//                 "skill3"
//             ],
//             "_id": "6687c7502f9895708d80110f"
//         }
//     ],
//     "replaceableWorkers": [],
//     "skill": "skill3",
//     "__v": 0
// }

// */
// TableShift.propTypes = {
// };

// export default TableShift;


