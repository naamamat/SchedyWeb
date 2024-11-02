import React, { useState } from 'react';
import axiosInstance from "../../context/axios";
import { useUserContext } from '../../context/UserProvider';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


function TableShiftsList({ shifts, setShifts }) {
  const { user } = useUserContext();
  const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited
  const [editingShift, setEditingShift] = useState(null); // Track edited shift data
  const [addingShift, setAddingShift] = useState(false); // Track if adding a new shift
  const [newShift, setNewShift] = useState({
    day: '',
    start_hour: '',
    number_of_workers: '',
    end_hour: '',
    skill:'',
    cost_per_worker: '',
  }); // State for new shift being added

  const handleEditClick = (index, shift) => {
    setEditingIndex(index); // Set the index of the row being edited
    setEditingShift({ ...shift }); // Copy the shift data for editing
  };

  const handleSaveClick = async () => {
    console.log("save click")



  // Filter workers based on fullName
  if (shifts == null)
    return null;
    const updatedShifts = shifts.shifts.map((shift, index) =>
      index === editingIndex ? editingShift : shift
    );


    // Update the shifts state with the edited shift


    // API calls to update shift data on the server
    try {
      if (shifts == null)
        return null;
      if (editingShift?.day !== shifts.shifts[editingIndex]?.day) {
        const change = await changeDate(editingShift.day, editingIndex);
      }
      if (editingShift?.start_hour !== shifts.shifts[editingIndex]?.start_hour) {
        await changeStartTime(editingShift.start_hour, editingIndex);
      }
      if (editingShift?.number_of_workers !== shifts.shifts[editingIndex]?.number_of_workers) {
        await changeNumberOfWorkers(editingShift.number_of_workers, editingIndex);
      }
      if (editingShift?.end_hour !== shifts.shifts[editingIndex]?.end_hour) {
        await changeEndTime(editingShift.end_hour, editingIndex);
      }
      if (editingShift?.skill !== shifts.shifts[editingIndex]?.skill) {
        await changeSkillShift(editingShift.skill, editingIndex);
      }
      if (editingShift?.cost_per_worker !== shifts.shifts[editingIndex]?.cost_per_worker) {
        await changeCostPerWorker(editingShift.cost_per_worker, editingIndex);
      }
    } catch (error) {
      console.error('Error updating shift data:', error);
      alert("Could not update shift data. Please try again.");
    }

    setShifts({ ...shifts, shifts: updatedShifts });
    setEditingIndex(null); // Stop editing mode
    console.log("regular mode")
  };

  async function changeDate(newDate, index) {
    try {
      console.log("change name ")
      const response = await axiosInstance.post(`/${user.orgId}/changeShiftDate`, { newDate, index });
      console.log("response", response)
      console.log("Date changed:", response.data);
      return response.data;
    } catch (error) {
      console.log("jjjj")
      console.log(error)
      console.log("Error changing date:", error);
      return null;
    }
  }

  async function changeStartTime(newStartTime, index) {
    try {
      console.log(newStartTime)
      console.log("change start time")
      const response = await axiosInstance.post(`/${user.orgId}/changeShiftStartTime`, { newStartTime, index });
      console.log("Start time changed:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error changing start time:", error);
      return null;
    }
  }

  async function changeEndTime(newEndTime, index) {
    try {
      const response = await axiosInstance.post(`/${user.orgId}/changeShiftEndTime`, { newEndTime, index });
      console.log("End time changed:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error changing end time:", error);
      return null;
    }
  }

  async function changeNumberOfWorkers(newNumberOfWorkers, index) {
    try {
      const response = await axiosInstance.post(`/${user.orgId}/changeNumberOfWorkers`, { newNumberOfWorkers, index });
      console.log("Number of workers changed:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error changing number of workers:", error);
      return null;
    }
  }

  const handleInputChange = (e, field) => {
    setEditingShift({
      ...editingShift,
      [field]: e.target.value,
    });
  };

  const handleAddShiftClick = () => {
    setAddingShift(true);
  };

  const handleNewShiftChange = (e, field) => {
    setNewShift({ ...newShift, [field]: e.target.value });
  };

  async function handleSaveNewShift() {
    try {
      const response = await axiosInstance.post(`/${user.orgId}/addNewShift`, { newShift});

      setShifts({ ...shifts, shifts: [...shifts.shifts, newShift] });
      setNewShift({
        day: '',
        start_hour: '',
        number_of_workers: '',
        end_hour: '',
        skill:'',
        cost_per_worker: ''
      }); // Reset the new shift fields
      setAddingShift(false); // Stop adding mode
    } catch (e) {
      alert("Could not add new shift. Please try again.");
    }
    };

  async function changeSkillShift(newSkill, id) {
    try {
      const response = await axiosInstance.post(`/${user.orgId}/changeSkillShift`, { newSkill, id });
      console.log("Skill changed:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error changing skill:", error);
      return null;
    }
  }
  async function changeCostPerWorker(newCost, id) {
    try {
      const response = await axiosInstance.post(`/${user.orgId}/changeCostPerWorker`, { newCost, id });
      console.log("Cost changed:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error changing newCost:", error);
      return null;
    }
  }

  const handleRemoveClick = async (index, shift) => {
    try {
      const response = await axiosInstance.post(`/${user.orgId}/removeShift`, {
        shiftId: shift.id,
      });

      if (response.status === 200) {
        // If the API call is successful, remove the shift from the local state
        setShifts((prevShifts) => {
          const updatedShifts = { ...prevShifts };
          updatedShifts.shifts.splice(index, 1); // Remove shift at the specific index
          return updatedShifts;
        });

        console.log(`Shift removed successfully at index ${index}`, shift);
      } else {
        console.error('Error removing shift:', response.data);
      }
    } catch (error) {
      console.error('Error removing shift:', error);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="td-shift">cost per worker</th>
          <th className="td-shift">day</th>
          <th className="td-shift">Start Time</th>
          <th className="td-shift">End Time</th>          
          <th className="td-shift">Number of workers</th>
          <th className="td-shift">Skill</th>
          <th className="td-shift">Options</th>
        </tr>
      </thead>
      <tbody>
        {shifts?.shifts?.map((shift, index) => (
          <tr key={index}>
            <td className="td-shift">{editingIndex === index ? (
                <input
                  type="text"
                  value={editingShift?.cost_per_worker || ''}
                  onChange={(e) => handleInputChange(e, 'cost_per_worker')}
                />
              ) : (
                shift.cost_per_worker
              )}</td>

            {/* Date */}
            <td className="td-shift">
              {editingIndex === index ? (
                <select id="day" value={editingShift?.day || ''} onChange={(e) => handleInputChange(e, 'day')}>
                  <option value="" disabled>
                    -- Select a day --
                  </option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              ) : (
                shift.day
              )}
            </td>

            {/* Start Time */}
            <td className="td-shift">
              {editingIndex === index ? (
                <input
                  type="time"
                  value={editingShift?.start_hour || ''}
                  onChange={(e) => handleInputChange(e, 'start_hour')}
                />
              ) : (
                shift.start_hour
              )}
            </td>
            <td className="td-shift">
              {editingIndex === index ? (
                <input
                  type="time"
                  value={editingShift?.end_hour || ''}
                  onChange={(e) => handleInputChange(e, 'end_hour')}
                />
              ) : (
                shift.end_hour
              )}
            </td>
            
            <td className="td-shift">
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingShift?.number_of_workers || ''}
                  onChange={(e) => handleInputChange(e, 'number_of_workers')}
                />
              ) : (
                shift.number_of_workers
              )}
            </td>

            <td className="td-shift">
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingShift?.skill || ''}
                  onChange={(e) => handleInputChange(e, 'skill')}
                />
              ) : (
                shift.skill
              )}
            </td>



            {/* Options */}
            <td className="td-shift">
              {editingIndex === index ? (
                <button className="submit-button save" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button className="submit-button save" onClick={() => handleEditClick(index, shift)}>
                  Edit
                </button>
              )}
              <button className="submit-button save" onClick={() => handleRemoveClick(index, shift)}>
                Remove
              </button>
            </td>
          </tr>
        ))}

        {/* Add New Shift Row */}
        {addingShift ? (
          <tr>
            <td className="td-shift">
              <input
                type="text"
                value={newShift.cost_per_worker}
                onChange={(e) => handleNewShiftChange(e, 'cost_per_worker')}
                placeholder="Cost per worker"
              />
            </td>
            <td className="td-shift">

                   <select id="day" value={newShift?.day || ''} onChange={(e) => handleNewShiftChange(e, 'day')}>
                  <option value="" disabled>
                    -- Select a day --
                  </option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
            </td>
            <td className="td-shift">
              <input
                type="time"
                value={newShift.start_hour}
                onChange={(e) => handleNewShiftChange(e, 'start_hour')}
                placeholder="Start Hour"
              />
            </td>
            <td className="td-shift">
              <input
                type="time"
                value={newShift.end_hour}
                onChange={(e) => handleNewShiftChange(e, 'end_hour')}
                placeholder="End hour"
              />
            </td>

            <td className="td-shift">
              <input
                type="text"
                value={newShift.number_of_workers}
                onChange={(e) => handleNewShiftChange(e, 'number_of_workers')}
                placeholder="Number of workers"
              />
            </td>
            <td className="td-shift">
              <input
                type="text"
                value={newShift.skill}
                onChange={(e) => handleNewShiftChange(e, 'skill')}
                placeholder="Skill"
              />
            </td>

            <td className="td-shift">
              <button className="submit-button save" onClick={handleSaveNewShift}>
                Save
              </button>
            </td>
          </tr>
        ) : (
          <tr>
            <td colSpan="5" className="td-shift">
              <button className="submit-button save" onClick={handleAddShiftClick}>
                +
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TableShiftsList;
