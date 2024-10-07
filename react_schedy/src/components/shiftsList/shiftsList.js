

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
  const [shifts, setShifts] = useState({ shifts: [] }); // Initialize as an object with an empty array
  const [filteredShifts, setFilteredShifts] = useState([]); 
  const [selectedSkill, setSelectedSkill] = useState(''); 
  const [selectedDay, setSelectedDay] = useState(''); 
  const [sortOption, setSortOption] = useState({ sortBy: null, order: 'asc' });

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const shiftsData = await getShifts(user.orgId);
        if (shiftsData && shiftsData.shifts) {
          setShifts(shiftsData); // Ensure shiftsData is properly set
          setFilteredShifts(shiftsData.shifts); // Initialize filtered shifts
        } else {
          setShifts({ shifts: [] }); // Set to an empty array if no data
        }
      } catch (err) {
        setError(true);
      }
    };
    fetchShifts();
  }, [user.orgId]);

  // Filter shifts based on skill and day
  const applyFilters = () => {
    let filtered = shifts?.shifts || []; // Use optional chaining to avoid null errors
    if (selectedSkill) {
      filtered = filtered.filter(shift => shift.skill === selectedSkill);
    }
    if (selectedDay) {
      filtered = filtered.filter(shift => shift.day === selectedDay);
    }
    setFilteredShifts(filtered);
  };

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

  async function handleProcessAgain() {
    try {
      await axiosInstance.get(`/${user.orgId}/generateNewScheduleAfterChanges`);
      alert("Created new shifts successfully");
      navigate("/shift");
    } catch (e) {
      alert("Error processing shifts again");
    }
  }

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
                {[...new Set(shifts?.shifts?.map(shift => shift.skill))].map((skill, index) => (
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
