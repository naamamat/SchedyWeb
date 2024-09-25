// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { nextSunday, endOfWeek, format, addDays, startOfDay, subDays} from 'date-fns';
// import '../../styles/styleShift.css';
// import TableShift from './tableShift';
// import Navbar from '../navbar';
// import { ORG_ID, SERVER_URL } from "../../consts";
// import axiosInstance from "../../context/axios";
// import Header from '../header';

// //     [$startTime-$endTime-$skill]: { mon,sun: [], sat: [],}
// const groupByTimeAndSkill = (schedule) => {
//   return schedule.reduce((original, row) => {
//     const key = `${row.shiftStartTime}-${row.shiftEndTime}-${row.skill}`;
//     if (!original[key]) {
//       original[key] = {
//         id: row._id,
//         skill: row.skill,
//         startTime: row.shiftStartTime,
//         endTime: row.shiftEndTime,
//         replaceableWorkers: row.replaceableWorkers,
//       };
//     }
//     if (!original[key][row.shiftDate]) {
//       original[key][row.shiftDate] = [];
//     }
//     original[key][row.shiftDate].push(...row.workers);
//     return original;
//   }, {});
// }

// const getCurrentWeekSchedule = (week) => {
//   return axiosInstance.get(`/${ORG_ID}/schedule`, { params: { week }}).then(res => res.data?.schedule)
// }

// const thisSunday = nextSunday(new Date());

// function Shift() {
//   const [currentWeek, setCurrentWeek] = useState(thisSunday);
//   const [schedule, setSchedule] = useState({});
//   const [error, setError] = useState();

//   const { startOfTheWeek, endOfTheWeek } = useMemo(() => {
//     const startOfTheWeek = currentWeek;
//     const endOfTheWeek = endOfWeek(startOfTheWeek, { weekStartsOn: 0 });
//     return { startOfTheWeek, endOfTheWeek }
//   },[currentWeek]);

//   const daysInTheWeek = useMemo(()=>
//     [...Array(7).keys()].map((i)=> startOfDay(addDays(startOfTheWeek, i)).toISOString()),[startOfTheWeek])

//   useEffect(()=> {
//     setError(null);
//     getCurrentWeekSchedule(currentWeek?.toISOString()).then((schedule)=> {
//       if (schedule) {
//         const groupedSchedule = groupByTimeAndSkill(schedule);
//         setSchedule(groupedSchedule);
//       }
//     }).catch((err)=> {
//       console.log("err", err)
//       setError(err)
//     })
//   }, [currentWeek])

//   return (
//     <div className="container">
//       <Navbar />

//       <section className="main">
//       <Header text="My Shifts" />
//         <div className="center-header">
//           {/* <h1 className="header">-Shift -</h1> */}
//           <div className="choose-section">
//             <button onClick={() => setCurrentWeek(subDays(startOfTheWeek, 7))} >Previous Week</button>
//             <span> {`${format(startOfTheWeek, 'dd MMM')} - ${format(endOfTheWeek, 'dd MMM')}`} </span>
//             <button onClick={() => setCurrentWeek(addDays(startOfTheWeek, 7))} >Next Week</button>
//           </div>
//           <button onClick={() => setCurrentWeek(thisSunday)} >Go to this week</button>
//         </div>

//         <section className="attendance">
//           <div className="attendance-list">
//             { error ?
//              <p> Error while fetching data. please try again later... </p>
//               : <TableShift schedule={schedule} days={daysInTheWeek} refreshSchedule={refreshSchedule}/>}
//           </div>
//         </section>
//       </section>

//       <nav className="shift-users">
//         <div className="users-hed">
//           <h2>Shift</h2>
//           <h3>Current placement</h3>
//         </div>
//         {/* Add current placement details */}

//         <div className="users-hed">
//           <h3>Options placement:</h3>
//         </div>
//         <ul>
//           {/* Add options placement list items */}
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Shift;
