


// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { nextSunday, endOfWeek, format, addDays, startOfDay, subDays } from 'date-fns';
// import '../../styles/styleShift.css';
// import TableShift from './tableShift';
// import Navbar from '../navbar';
// import { ORG_ID, SERVER_URL } from "../../consts";
// import axiosInstance from "../../context/axios";
// import Header from '../header';

// // Group schedule data by time and skill
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
// };

// const getCurrentWeekSchedule = (week) => {
//   return axiosInstance.get(`/${ORG_ID}/schedule`, { params: { week } }).then(res => res.data?.schedule);
// };

// const thisSunday = nextSunday(new Date());

// function Shift() {
//   const [currentWeek, setCurrentWeek] = useState(thisSunday);
//   const [schedule, setSchedule] = useState({});
//   const [error, setError] = useState();
//   const [filterFullName, setFilterFullName] = useState(''); // New state to store filter fullName

//   const { startOfTheWeek, endOfTheWeek } = useMemo(() => {
//     const startOfTheWeek = currentWeek;
//     const endOfTheWeek = endOfWeek(startOfTheWeek, { weekStartsOn: 0 });
//     return { startOfTheWeek, endOfTheWeek };
//   }, [currentWeek]);

//   const daysInTheWeek = useMemo(() =>
//     [...Array(7).keys()].map((i) => startOfDay(addDays(startOfTheWeek, i)).toISOString()), [startOfTheWeek]);

//   useEffect(() => {
//     refreshSchedule();
//   }, [currentWeek]);

//   const refreshSchedule = useCallback(() => {
//     setError(null);
//     getCurrentWeekSchedule(currentWeek?.toISOString()).then((schedule) => {
//       if (schedule) {
//         const groupedSchedule = groupByTimeAndSkill(schedule);
//         setSchedule(groupedSchedule);
//       }
//     }).catch((err) => {
//       console.log("err", err);
//       setError(err);
//     });
//   }, [currentWeek]);

//   return (
//     <div className="container">
//       <Navbar />
//       <section className="main">
//         <Header text="My Shifts" />
//         <div className="center-header">
//           <div className="choose-section">
//             <button onClick={() => setCurrentWeek(subDays(startOfTheWeek, 7))}>Previous Week</button>
//             <span>{`${format(startOfTheWeek, 'dd MMM')} - ${format(endOfTheWeek, 'dd MMM')}`}</span>
//             <button onClick={() => setCurrentWeek(addDays(startOfTheWeek, 7))}>Next Week</button>
//           </div>
//           <button onClick={() => setCurrentWeek(thisSunday)}>Go to this week</button>
//         </div>

//         {/* Add input to filter by worker fullName */}
//         <div className="filter-section">
//           <input
//             type="text"
//             placeholder="Filter by worker name"
//             value={filterFullName}
//             onChange={(e) => setFilterFullName(e.target.value)}
//           />
//         </div>

//         <section className="attendance">
//           <div className="attendance-list">
//             {error ?
//               <p>Error while fetching data. Please try again later...</p>
//               : <TableShift schedule={schedule} days={daysInTheWeek} filterFullName={filterFullName} refreshSchedule={refreshSchedule} />}
//           </div>
//         </section>
//       </section>
//     </div>
//   );
// }

// export default Shift;




























// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { nextSunday, endOfWeek, format, addDays, startOfDay, subDays } from 'date-fns';
// import '../../styles/styleShift.css';
// import TableShift from './tableShift';
// import Navbar from '../navbar';
// import { ORG_ID, SERVER_URL } from "../../consts";
// import axiosInstance from "../../context/axios";
// import Header from '../header';

// // Group schedule data by time and skill
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
// };

// const getCurrentWeekSchedule = (week) => {
//   return axiosInstance.get(`/${ORG_ID}/schedule`, { params: { week } }).then(res => res.data?.schedule);
// };

// const thisSunday = nextSunday(new Date());

// function Shift() {
//   const [currentWeek, setCurrentWeek] = useState(thisSunday);
//   const [schedule, setSchedule] = useState({});
//   const [error, setError] = useState();
//   const [filterFullName, setFilterFullName] = useState(''); // To filter workers by name
//   const [sortOrder, setSortOrder] = useState("asc"); // Sort by startTime
//   const [selectedPosition, setSelectedPosition] = useState(''); // Filter by position
//   const [availablePositions, setAvailablePositions] = useState([]); // Available positions for the dropdown

//   const { startOfTheWeek, endOfTheWeek } = useMemo(() => {
//     const startOfTheWeek = currentWeek;
//     const endOfTheWeek = endOfWeek(startOfTheWeek, { weekStartsOn: 0 });
//     return { startOfTheWeek, endOfTheWeek };
//   }, [currentWeek]);

//   const daysInTheWeek = useMemo(() =>
//     [...Array(7).keys()].map((i) => startOfDay(addDays(startOfTheWeek, i)).toISOString()), [startOfTheWeek]);

//   useEffect(() => {
//     refreshSchedule();
//   }, [currentWeek]);

//   const refreshSchedule = useCallback(() => {
//     setError(null);
//     getCurrentWeekSchedule(currentWeek?.toISOString()).then((schedule) => {
//       if (schedule) {
//         const groupedSchedule = groupByTimeAndSkill(schedule);
//         setSchedule(groupedSchedule);
//         setAvailablePositions([...new Set(schedule.map(shift => shift.skill))]); // Extract available positions
//       }
//     }).catch((err) => {
//       console.log("err", err);
//       setError(err);
//     });
//   }, [currentWeek]);

//   // Sort schedule by shift startTime
//   const handleSortOrderChange = (order) => {
//     setSortOrder(order);
//   };

//   // Handle position filter change
//   const handlePositionFilterChange = (event) => {
//     setSelectedPosition(event.target.value);
//   };

//   return (
//     <div className="container">
//       <Navbar />
//       <section className="main">
//         <Header text="My Shifts" />
//         {/* <div className="center-header">
//           <div className="choose-section">
//             <button onClick={() => setCurrentWeek(subDays(startOfTheWeek, 7))}>Previous Week</button>
//             <span>{`${format(startOfTheWeek, 'dd MMM')} - ${format(endOfTheWeek, 'dd MMM')}`}</span>
//             <button onClick={() => setCurrentWeek(addDays(startOfTheWeek, 7))}>Next Week</button>
//           </div>
//           </div> */}


//           <div className="buttons-s">
//           <div className="filter-section">
//           <div>
//                       <button className="btnFont" onClick={() => setCurrentWeek(thisSunday)}>Next week</button>
//           </div>
//             <div>
//                  <button onClick={() => setCurrentWeek(subDays(startOfTheWeek, 7))}>👈</button>
//             </div>
//             <div>
//             <span>{`${format(startOfTheWeek, 'dd MMM')} - ${format(endOfTheWeek, 'dd MMM')}`}</span>
//             </div>
//             <div>
//             <button onClick={() => setCurrentWeek(addDays(startOfTheWeek, 7))}>👉</button>
//               </div>




//           </div>


//               <div className="filter-section">



//                   <div>
//                       <label>Worker: </label>
//                       <input
//                         type="text"
//                         // placeholder="Filter by worker name"
//                         value={filterFullName}
//                         onChange={(e) => setFilterFullName(e.target.value)}
//                       />
//                   </div>

//                   <div>
//                       <label>Position: </label>
//                       <input
//                         list="position-list"
//                         value={selectedPosition}
//                         onChange={handlePositionFilterChange}
//                         // placeholder="Search position"
//                       />
//                       <datalist id="position-list">
//                         {availablePositions.map((position, index) => (
//                           <option key={index} value={position} />
//                         ))}
//                       </datalist>
//                   </div>

//                   <div>
//                       <label>Sort by Shift Time: </label>
//                       <button onClick={() => handleSortOrderChange("asc")}>☝️</button>
//                       <button onClick={() => handleSortOrderChange("desc")}>👇</button>
//                   </div>


//         </div>


//         </div>


//         <section className="attendance">
//           <div className="attendance-list">
//             {error ?
//               <p>Error while fetching data. Please try again later...</p>
//               :


//               // <TableShift
//               //     schedule={schedule}
//               //     days={daysInTheWeek}
//               //     filterFullName={filterFullName}
//               //     sortOrder={sortOrder}
//               //     selectedPosition={selectedPosition}
//               //     refreshSchedule={refreshSchedule}
//               //   />

//               <TableShift
//   schedule={schedule}
//   days={daysInTheWeek}
//   filterFullName={filterFullName}
//   sortOrder={sortOrder}          // Pass the sortOrder to TableShift
//   selectedPosition={selectedPosition}  // Pass the selectedPosition to TableShift
//   refreshSchedule={refreshSchedule}
// />


//                 }
//           </div>
//         </section>
//       </section>
//     </div>
//   );
// }

// export default Shift;


import React, { useCallback, useEffect, useMemo, useState } from "react";
import { nextSunday, endOfWeek, format, addDays, startOfDay, subDays } from 'date-fns';
import '../../styles/styleShift.css';
import TableShift from './tableShift';
import Navbar from '../navbar';
import axiosInstance from "../../context/axios";
import Header from '../header';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Import html2canvas
import { useUserContext } from "../../context/UserProvider";
import SendMail from '../sendMail';


// Group schedule data by time and skill
const groupByTimeAndSkill = (schedule) => {
  return schedule.reduce((original, row) => {
    const key = `${row.shiftStartTime}-${row.shiftEndTime}-${row.skill}`;
    if (!original[key]) {
      original[key] = {
        id: row._id,
        skill: row.skill,
        startTime: row.shiftStartTime,
        endTime: row.shiftEndTime,
        replaceableWorkers: row.replaceableWorkers,
      };
    }
    if (!original[key][row.shiftDate]) {
      original[key][row.shiftDate] = [];
    }
    original[key][row.shiftDate].push(...row.workers);
    return original;
  }, {});
};

const getCurrentWeekSchedule = (week, orgId) => {
  return axiosInstance.get(`/${orgId}/schedule`, { params: { week } }).then(res => res.data?.schedule);
};

const getReplaceableAPI = (week, orgId) => {
  return axiosInstance.get(`/${orgId}/replaceableWorkers`, { params: { week }}).then(res => res.data?.replaceableWorkers)
}


const thisSunday = nextSunday(new Date());

function Shift() {
  const { user } = useUserContext();
  const [replaceableWorkers, setReplaceableWorkers] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(thisSunday);
  const [schedule, setSchedule] = useState({});
  const [error, setError] = useState();
  const [filterFullName, setFilterFullName] = useState('');
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedPosition, setSelectedPosition] = useState('');
  const [availablePositions, setAvailablePositions] = useState([]);

  const { startOfTheWeek, endOfTheWeek } = useMemo(() => {
    const startOfTheWeek = currentWeek;
    const endOfTheWeek = endOfWeek(startOfTheWeek, { weekStartsOn: 0 });
    return { startOfTheWeek, endOfTheWeek };
  }, [currentWeek]);

  const daysInTheWeek = useMemo(() =>
    [...Array(7).keys()].map((i) => startOfDay(addDays(startOfTheWeek, i)).toISOString()), [startOfTheWeek]);

  useEffect(()=> {
    Promise.all([refreshSchedule(), getReplaceableWorkers()])
    setTimeout(()=> {
      if (!replaceableWorkers?.[0]?.replaceableWorkers || !replaceableWorkers[0]?.replaceableWorkers?.length)
        getReplaceableWorkers();
    }, 2500)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentWeek])


  const getReplaceableWorkers = useCallback(() => {
    getReplaceableAPI(currentWeek?.toISOString(), user?.orgId).then((schedule)=> {
      setReplaceableWorkers(schedule);
      if (schedule?.length > 0) {
        const groupedSchedule = groupByTimeAndSkill(schedule);
        setSchedule(groupedSchedule);
        setAvailablePositions([...new Set(schedule.map(shift => shift.skill))]);
      }
    }).catch((err)=> {
      console.log("Could not get replaceable workers", err)
    })
  }, [currentWeek, user])

  const refreshSchedule = useCallback(() => {
    setError(null);
    getCurrentWeekSchedule(currentWeek?.toISOString(),  user?.orgId).then((schedule) => {
      if (schedule) {
        const groupedSchedule = groupByTimeAndSkill(schedule);
        setSchedule(groupedSchedule);
        setAvailablePositions([...new Set(schedule.map(shift => shift.skill))]);
      }
    }).catch((err) => {
      console.log("err", err);
      setError(err);
    });
  }, [currentWeek, user]);

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handlePositionFilterChange = (event) => {
    setSelectedPosition(event.target.value);
  };



  // const generatePDF = () => {
  //   const input = document.getElementById('pdf-content'); // ID of the container to capture

  //   // Temporarily remove any height or overflow constraints so that the entire content is rendered
  //   const originalHeight = input.style.height;
  //   const originalOverflow = input.style.overflow;
  //   const originalMaxHeight = input.style.maxHeight; // If there is a max height restriction

  //   input.style.height = 'auto'; // Ensure the container height is auto to capture full content
  //   input.style.overflow = 'visible'; // Ensure overflow content is fully visible
  //   input.style.maxHeight = 'none'; // Disable any max height settings

  //   // Use html2canvas to capture the full content of the container
  //   html2canvas(input, { scrollY: -window.scrollY, useCORS: true }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');

  //     const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF (A4 size)

  //     const pageWidth = pdf.internal.pageSize.getWidth(); // Width of the PDF page
  //     const pageHeight = pdf.internal.pageSize.getHeight(); // Height of the PDF page

  //     const imgWidth = pageWidth - 20; // Set the image width (leaving a margin)
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the proportional image height

  //     let heightLeft = imgHeight;
  //     let position = 10; // Initial position in the PDF

  //     // Add the first image to the PDF
  //     pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight - 20;

  //     // Add additional pages if the content exceeds one page
  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage(); // Create a new page
  //       pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight - 20; // Adjust for the next page
  //     }

  //     // Save the PDF
  //     pdf.save("attendance.pdf");

  //     // Restore the original styles after PDF generation
  //     input.style.height = originalHeight;
  //     input.style.overflow = originalOverflow;
  //     input.style.maxHeight = originalMaxHeight;
  //   });
  // };

  const generatePDF = () => {
    const input = document.getElementById('pdf-content'); // ID of the container to capture

    // Temporarily remove any height or overflow constraints so that the entire content is rendered
    const originalHeight = input.style.height;
    const originalOverflow = input.style.overflow;
    const originalMaxHeight = input.style.maxHeight; // If there is a max height restriction

    input.style.height = 'auto'; // Ensure the container height is auto to capture full content
    input.style.overflow = 'visible'; // Ensure overflow content is fully visible
    input.style.maxHeight = 'none'; // Disable any max height settings

    // Use html2canvas to capture the full content of the container
    html2canvas(input, { scrollY: -window.scrollY, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF (A4 size)

      const pageWidth = pdf.internal.pageSize.getWidth(); // Width of the PDF page
      const pageHeight = pdf.internal.pageSize.getHeight(); // Height of the PDF page

      const imgWidth = pageWidth - 20; // Set the image width (leaving a margin)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the proportional image height

      let heightLeft = imgHeight;
      // let position = 30; // Start the image lower to leave space for the header (30 mm from the top)


      
    // Add the header
    pdf.setFontSize(22); // Set font size for the header
    pdf.setFont("helvetica", "bold"); // Use Helvetica Bold as a fallback for a sleek look
    pdf.text(`Shift Schedule: ${format(startOfTheWeek, 'dd MMM')} - ${format(endOfTheWeek, 'dd MMM')} from Schedy!`, 10, 20); // Positioned 10mm from the left, 20mm from the top

    // Add a line for separation
    pdf.setLineWidth(0.5); // Set the line thickness
    pdf.line(10, 25, 200, 25); // Draw a line (from x=10, y=25 to x=200, y=25)



    let position = 35; // Reset position for the new page




      // Add the first image to the PDF
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - position;

      // Add additional pages if the content exceeds one page
      while (heightLeft > 0) {
        pdf.addPage(); // Create a new page
        pdf.text("This is the Weekly Shift", 10, 20); // Add header text to each page
        position = heightLeft - imgHeight + 30; // Maintain the header space
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 30; // Adjust for the next page
      }

      // Save the PDF
      pdf.save("Schedy-shifts.pdf");

      // Restore the original styles after PDF generation
      input.style.height = originalHeight;
      input.style.overflow = originalOverflow;
      input.style.maxHeight = originalMaxHeight;
    });
  };


  return (
    <div className="container">
      <Navbar />

      <section className="main" > {/* ID added to capture the content */}
        <Header text="My Shifts" />
              {/* Add button to generate PDF */}


        <div className="buttons-s">

        <div className="filter-section">
            <div>
      <button onClick={generatePDF}>Download PDF</button>
            </div>
          </div>
          <div className="filter-section">
            <div>
              <button className="btnFont" onClick={() => setCurrentWeek(thisSunday)}>Next week</button>
            </div>
            <div>
              <button onClick={() => setCurrentWeek(subDays(startOfTheWeek, 7))}>👈</button>

              <span>{`${format(startOfTheWeek, 'dd MMM')} - ${format(endOfTheWeek, 'dd MMM')}`}</span>

              <button onClick={() => setCurrentWeek(addDays(startOfTheWeek, 7))}>👉</button>
            </div>
          </div>

          <div className="filter-section">
            <div>
              <label>Worker: </label>
              <input
                type="text"
                value={filterFullName}
                onChange={(e) => setFilterFullName(e.target.value)}
              />
            </div>

            <div>
              <label>Position: </label>
              <input
                list="position-list"
                value={selectedPosition}
                onChange={handlePositionFilterChange}
              />
              <datalist id="position-list">
                {availablePositions.map((position, index) => (
                  <option key={index} value={position} />
                ))}
              </datalist>
            </div>

            <div>
              <label>Sort by Shift Time: </label>
              <button onClick={() => handleSortOrderChange("asc")}>☝️</button>
              <button onClick={() => handleSortOrderChange("desc")}>👇</button>
            </div>
          </div>
        </div>

        <section className="attendance" id="pdf-content">
          <div className="attendance-list">
            {error ? (
              <p>Error while fetching data. Please try again later...</p>
            ) : (
              <TableShift
                schedule={schedule}
                days={daysInTheWeek}
                filterFullName={filterFullName}
                sortOrder={sortOrder}
                selectedPosition={selectedPosition}
                refreshSchedule={refreshSchedule}
              />
            )}
          </div>
        </section>
      </section>


    </div>
  );
}

export default Shift;


// 1. created a schedule
// 2. on the background, created a replaceable workers
// 4. we went to the UI, and requested the schedule and the replaceable workers
// 5. but, the replaceable workers were not ready yet
