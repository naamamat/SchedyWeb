

import React, { useState } from 'react';
import User from '../../pic/userRed.png'; // Placeholder image
import axiosInstance from "../../context/axios";
import { useUserContext } from '../../context/UserProvider';
import Pic from '../../context/workerPic.js'
import '../../styles/workersList.css';
import { useNavigate } from "react-router-dom";



function TableWorkersList({ workers, setWorkers, filterFullName }) {

  const { user } = useUserContext();
  const navigate = useNavigate();
  const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited
  const [editingWorker, setEditingWorker] = useState(null); // Track edited worker data
  const [addingWorker, setAddingWorker] = useState(false); // Track if adding a new worker
  const [newWorker, setNewWorker] = useState({
    id: '',
    fullName: '',
    skills: ['', '', ''],
  }); // State for new worker being added

  // Filter workers based on fullName
  if (workers == null)
    return null;
    const filteredWorkers = workers.workers.filter(worker =>
    worker.fullName.toLowerCase().includes(filterFullName.toLowerCase())
  );


  const handleEditClick = (index, worker) => {
    setEditingIndex(index); // Set the index of the row being edited
    setEditingWorker({ ...worker }); // Copy the worker data for editing
  };

  const handleSaveClick = async () => {
    // Update the workers state with the edited worker
    const updatedWorkers = workers.workers.map((worker, index) =>
      index === editingIndex ? editingWorker : worker
    );

    // API calls to update fullName and skills on the server
    try {
      if (editingWorker?.fullName !== workers.workers[editingIndex]?.fullName) {
        await changeName(editingWorker.fullName, editingWorker.id);
      }

      for (let i = 0; i < editingWorker.skills.length; i++) {
        if (editingWorker.skills[i] !== workers.workers[editingIndex]?.skills[i]) {
          await handleSkillChange(editingWorker.skills[i], i, editingWorker.id);
        }
      }
    } catch (error) {
      console.error('Error updating worker data:', error);
    }

    setWorkers({ ...workers, workers: updatedWorkers });
    setEditingIndex(null); // Stop editing mode
  };

  async function changeName(newName, id) {
    try {
      const response = await axiosInstance.post(`/${user.orgId}/changeUserName`, { newName, id });
      console.log("Name changed:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error changing name:", error);
      return null;
    }
  }

  async function handleSkillChange(skill, index, id) {
    try {
      const response = await axiosInstance.post(`/${user.orgId}/changeUserSkill`, { id, index, skill });
      console.log("Skill changed:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error changing skill:", error);
      return null;
    }
  }

  const handleInputChange = (e, field) => {
    setEditingWorker({
      ...editingWorker,
      [field]: e.target.value,
    });
  };

  const handleSkillInputChange = (e, index) => {
    const updatedSkills = [...editingWorker.skills];
    updatedSkills[index] = e.target.value;
    setEditingWorker({
      ...editingWorker,
      skills: updatedSkills,
    });
  };

  const handleAddWorkerClick = () => {
    setAddingWorker(true);
  };

  const handleNewWorkerChange = (e, field) => {
    if (field === 'skills') {
      const updatedSkills = [...newWorker.skills];
      updatedSkills[e.target.name] = e.target.value;
      setNewWorker({ ...newWorker, skills: updatedSkills });
    } else {
      setNewWorker({ ...newWorker, [field]: e.target.value });
    }
  };

  async function handleSaveNewWorker() {
    setWorkers({ ...workers, workers: [...workers.workers, newWorker] });
    const response = await axiosInstance.post(`/${user.orgId}/addNewWorker`, {id: newWorker.id, fullName: newWorker.fullName, skills: newWorker.skills});
    setNewWorker({
      id: '',
      fullName: '',
      skills: ['', '', ''],
    }); // Reset the new worker fields
    setAddingWorker(false); // Stop adding mode
  };

  const handleRemoveClick = async (index, worker) => {
    try {
      console.log("remove");

      // Send request to remove the worker from the server
      const response = await axiosInstance.post(`/${user.orgId}/removeWorkerList`, {
        workerId: worker.id,
      });

      if (response.status === 200) {
        // If the server-side removal is successful, update the local state
        setWorkers((prevWorkers) => {
          const updatedWorkers = { ...prevWorkers };
          updatedWorkers.workers = updatedWorkers.workers.filter(
            (w, i) => i !== index
          ); // Filter out the worker based on the index
          return updatedWorkers;
        });
      } else {
        console.error("Error removing worker: ", response.data);
      }
    } catch (error) {
      console.error('Error removing worker:', error);
    }
  };


  // const handleWatchClick = async (index, worker) => {
  //   navigate(`/shiftWorker/${worker.id}`);
  // };
  const handleWatchClick = async (index, worker) => {
    navigate(`/shiftWorker/${worker.id}`, { state: { fullName: worker.fullName } });
  };
  


  return (
    <table className="table">
      <thead>
        <tr>
          <th className="td-shift">Picture</th>
          <th className="td-shift">ID</th>
          <th className="td-shift">Full Name</th>
          <th className="td-shift">Skill 1</th>
          <th className="td-shift">Skill 2</th>
          <th className="td-shift">Skill 3</th>
          <th className="td-shift">Options</th>
          <th className="td-shift">Watch Shifts</th>
        </tr>
      </thead>
      <tbody>
        {/* {workers?.workers?.map((worker, index) => (
          <tr key={index}>
            <td className="td-shift">
              <Pic id={worker.id}></Pic>
            </td>
            <td className="td-shift">{worker.id}</td> */}

{filteredWorkers?.map((worker, index) => (
          <tr key={index}>
            {/* Render worker data */}
            <td className="td-shift">
              <Pic id={worker.id}></Pic>
            </td>
            <td className="td-shift">{worker.id}</td>
            {/* <td className="td-shift">{worker.fullName}</td> */}

            {/* Full Name */}
            <td className="td-shift">
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingWorker?.fullName || ''}
                  onChange={(e) => handleInputChange(e, 'fullName')}
                />
              ) : (
                worker.fullName
              )}
            </td>

            {/* Skills */}
            {[...worker.skills, null, null, null].slice(0,3).map((skill, skillIndex) => (
              <td className="td-shift" key={skillIndex}>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editingWorker?.skills[skillIndex] || ''}
                    onChange={(e) => handleSkillInputChange(e, skillIndex)}
                  />
                ) : (
                  skill
                )}
              </td>
            ))}

            {/* Options
            <td className="td-shift">
              {editingIndex === index ? (
                <button className="submit-button save" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button className="submit-button save" onClick={() => handleEditClick(index, worker)}>
                  Edit
                </button>
              )}
              <button className="submit-button save">Shifts</button>
            </td> */}
            {/* Options */}
            <td className="td-shift">
              {editingIndex === index ? (
                <button className="submit-button save" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button className="submit-button save" onClick={() => handleEditClick(index, worker)}>
                  Edit
                </button>
              )}
              <button className="submit-button save" onClick={() => handleRemoveClick(index, worker)}>
                Remove
              </button>
            </td>
            <td>
            <button className="submit-button save" onClick={() => handleWatchClick(index, worker)}>
                Watch
              </button>
            </td>
          </tr>
        ))}

        {/* Add New Worker Row */}
        {addingWorker ? (
          <tr>
            <td className="td-shift">
              <img src={User} alt="Worker" className="img-WorkerList" />
            </td>
            <td className="td-shift">
              <input
                type="text"
                value={newWorker.id}
                onChange={(e) => handleNewWorkerChange(e, 'id')}
                placeholder="ID"
              />
            </td>
            <td className="td-shift">
              <input
                type="text"
                value={newWorker.fullName}
                onChange={(e) => handleNewWorkerChange(e, 'fullName')}
                placeholder="Full Name"
              />
            </td>
            <td className="td-shift">
              <input
                type="text"
                name="0"
                value={newWorker.skills[0]}
                onChange={(e) => handleNewWorkerChange(e, 'skills')}
                placeholder="Skill 1"
              />
            </td>
            <td className="td-shift">
              <input
                type="text"
                name="1"
                value={newWorker.skills[1]}
                onChange={(e) => handleNewWorkerChange(e, 'skills')}
                placeholder="Skill 2"
              />
            </td>
            <td className="td-shift">
              <input
                type="text"
                name="2"
                value={newWorker.skills[2]}
                onChange={(e) => handleNewWorkerChange(e, 'skills')}
                placeholder="Skill 3"
              />
            </td>
            <td className="td-shift">
              <button className="submit-button save" onClick={handleSaveNewWorker}>
                Save
              </button>
            </td>
          </tr>
        ) : (
          <tr>
            <td colSpan="7" className="td-shift">
              <button className="submit-button save" onClick={handleAddWorkerClick}>
                +
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>

  );
}

export default TableWorkersList;



