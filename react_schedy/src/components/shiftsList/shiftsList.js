// import React, { useEffect, useState } from "react";
// import '../../styles/styleShift.css';
// import TableShiftsList from './tableShiftsList'; // Assuming you have a component for displaying shifts
// import Navbar from '../navbar';
// import Header from '../header';
// import axiosInstance from "../../context/axios";
// import { useUserContext } from "../../context/UserProvider";
// import { useNavigate } from "react-router-dom";

// // Fetching shifts from the server
// async function getShifts(orgId) {
//   try {
//     const response = await axiosInstance.get(`/${orgId}/shifts`);
//     console.log("shifts before processing:", response);
//     const shifts = response.data?.shifts;
//     console.log("shifts after processing:", shifts.shifts);

//     return shifts;
//   } catch (error) {
//     console.log("Error fetching shifts:", error);
//     return null;
//   }
// }


// // Main ShiftsList component
// function ShiftsList() {
//   const navigate = useNavigate();
//   const { user } = useUserContext();
//   const [error, setError] = useState(false);
//   const [shifts, setShifts] = useState({ shifts: [] }); // State initialized with shifts

//   // Handling some additional processing (optional)
//   async function handleProcessAgain(){
//     try {
//       await axiosInstance.get(`/${user.orgId}/generateNewScheduleAfterChanges`);
//       console.log("Process shifts again");
//       alert("Created new shifts successfully");
//       navigate("/shift");
//     }  catch (e) {
//       console.log("Error processing shifts again:", e);
//       alert("Error processing shifts again");
//     }
//   }

//   useEffect(() => {
//     const fetchShifts = async () => {
//       try {
//         const shiftsData = await getShifts(user.orgId); // Fetch the shifts data
//         setShifts(shiftsData); // Set shifts data to state
//       } catch (err) {
//         setError(true); // Handle errors
//       }
//     };
//     fetchShifts();
//   }, []);

//   return (
//     <div className="container">
//       <Navbar />

//       <section className="main">
//         <Header text="My Shifts" />

//         <div className="buttons-s">


//           <div className="filter-section">

//             <div>
//               <label>Skill: </label>
//               <input
//                 list="position-list"
//                 // value={selectedPosition}
//                 // onChange={handlePositionFilterChange}
//               />
//               {/* <datalist id="position-list">
//                 {availablePositions.map((position, index) => (
//                   <option key={index} value={position} />
//                 ))}
//               </datalist> */}
//             </div>

//             <div>
//               <label>Sort by Shift Time: </label>
//               <button 
//               // onClick={() => handleSortOrderChange("asc")}
//               >☝️</button>
//               <button 
//               // onClick={() => handleSortOrderChange("desc")}
//               >👇</button>
//             </div>

//             <div>
//               <label>Sort by Cost: </label>
//               <button 
//               // onClick={() => handleSortOrderChange("asc")}
//               >☝️</button>
//               <button 
//               // onClick={() => handleSortOrderChange("desc")}
//               >👇</button>
//             </div>

//             <div>
//             <label>Day: </label>
//               <input/>
//             {/* //     list="position-list"
//             // <select id="day" value={editingShift?.day || ''} onChange={(e) => handleInputChange(e, 'day')}>
//             //       <option value="" disabled>
//             //         -- Select a day --
//             //       </option>
//             //       {daysOfWeek.map((day) => (
//             //         <option key={day} value={day}>
//             //           {day}
//             //         </option>
//             //       ))}
//             //     </select> */}
//             </div>
//           </div>
//         </div>


//         <button className="submit-button save" onClick={() => handleProcessAgain()}>
//           Process Again
//         </button>
//         <section className="attendance">
//           <div className="shiftsList">
//             {error ? (
//               <p>Error while fetching data. Please try again later...</p>
//             ) : (
//               <TableShiftsList shifts={shifts} setShifts={setShifts} /> // Adjust component to display shifts
//             )}
//           </div>
//         </section>
//       </section>

//     </div>
//   );
// }

// export default ShiftsList;



import React, { useEffect, useState } from "react";
import '../../styles/styleShift.css';
import TableShiftsList from './tableShiftsList'; 
import Navbar from '../navbar';
import Header from '../header';
import axiosInstance from "../../context/axios";
import { useUserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";

// Fetching shifts from the server
async function getShifts(orgId) {
  try {
    const response = await axiosInstance.get(`/${orgId}/shifts`);
    const shifts = response.data?.shifts;
    return shifts;
  } catch (error) {
    console.log("Error fetching shifts:", error);
    return null;
  }
}

function ShiftsList() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [error, setError] = useState(false);
  const [shifts, setShifts] = useState({ shifts: [] });
  const [filteredShifts, setFilteredShifts] = useState([]); // For filtered/sorted shifts
  const [selectedSkill, setSelectedSkill] = useState(''); // Track selected skill for filtering
  const [selectedDay, setSelectedDay] = useState(''); // Track selected day for filtering
  const [sortOption, setSortOption] = useState({ sortBy: null, order: 'asc' }); // Sort state

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const shiftsData = await getShifts(user.orgId);
        setShifts(shiftsData);
        setFilteredShifts(shiftsData.shifts);
      } catch (err) {
        setError(true);
      }
    };
    fetchShifts();
  }, []);

  // Filter shifts based on skill and day
  const applyFilters = () => {
    let filtered = shifts.shifts;
    if (selectedSkill) {
      filtered = filtered.filter(shift => shift.skill === selectedSkill);
    }
    if (selectedDay) {
      filtered = filtered.filter(shift => shift.day === selectedDay);
    }
    setFilteredShifts(filtered);
  };

  // Sort by start time or cost per worker
  const applySort = (sortBy, order) => {
    const sortedShifts = [...filteredShifts].sort((a, b) => {
      if (sortBy === 'start_hour' || sortBy === 'cost_per_worker') {
        const valueA = sortBy === 'start_hour' ? a[sortBy].replace(':', '') : parseFloat(a[sortBy]);
        const valueB = sortBy === 'start_hour' ? b[sortBy].replace(':', '') : parseFloat(b[sortBy]);
        if (order === 'asc') return valueA - valueB;
        return valueB - valueA;
      }
      return 0;
    });
    setFilteredShifts(sortedShifts);
  };

  useEffect(() => {
    applyFilters(); // Apply filters whenever selectedSkill or selectedDay changes
  }, [selectedSkill, selectedDay]);

  useEffect(() => {
    if (sortOption.sortBy) {
      applySort(sortOption.sortBy, sortOption.order);
    }
  }, [sortOption]);




  // Handling some additional processing (optional)
  async function handleProcessAgain(){
    try {
      await axiosInstance.get(`/${user.orgId}/generateNewScheduleAfterChanges`);
      console.log("Process shifts again");
      alert("Created new shifts successfully");
      navigate("/shift");
    }  catch (e) {
      console.log("Error processing shifts again:", e);
      alert("Error processing shifts again");
    }
  }

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const shiftsData = await getShifts(user.orgId); // Fetch the shifts data
        setShifts(shiftsData); // Set shifts data to state
      } catch (err) {
        setError(true); // Handle errors
      }
    };
    fetchShifts();
  }, []);




  return (
    <div className="container">
      <Navbar />

      <section className="main">
        <Header text="My Shifts" />

        <div className="buttons-s">
          <div className="filter-section">
            <div>
              <label>Skill: </label>
              <input
                list="position-list"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              />
              <datalist id="position-list">
                {[...new Set(shifts.shifts.map(shift => shift.skill))].map((skill, index) => (
                  <option key={index} value={skill} />
                ))}
              </datalist>
            </div>

            <div>
              <label>Day: </label>
              <input
                list="day-list"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              />
              <datalist id="day-list">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                  <option key={index} value={day} />
                ))}
              </datalist>
            </div>

            <div>
              <label>Sort by Start Time: </label>
              <button onClick={() => setSortOption({ sortBy: 'start_hour', order: 'asc' })}>☝️</button>
              <button onClick={() => setSortOption({ sortBy: 'start_hour', order: 'desc' })}>👇</button>
            </div>

            <div>
              <label>Sort by Cost: </label>
              <button onClick={() => setSortOption({ sortBy: 'cost_per_worker', order: 'asc' })}>☝️</button>
              <button onClick={() => setSortOption({ sortBy: 'cost_per_worker', order: 'desc' })}>👇</button>
            </div>
          </div>

          <div className="filter-section">
            <div>
              <button onClick={() => handleProcessAgain()}>Process Again</button>
            </div>
          </div>

        {/* <button className="submit-button save" onClick={() => handleProcessAgain()}>
          Process Again
        </button> */}

        </div>


        <section className="attendance">
          <div className="shiftsList">
            {error ? (
              <p>Error while fetching data. Please try again later...</p>
            ) : (
              <TableShiftsList shifts={{ shifts: filteredShifts }} setShifts={setShifts} />
            )}
          </div>
        </section>
      </section>
    </div>
  );
}

export default ShiftsList;
