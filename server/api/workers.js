const { Schedule } = require('../schema/schedule');
const { Worker, Workers } = require('../schema/worker');
const { findReplaceableWorkers } = require('../utils/processShift');
const { addWorkerFromReplaceable, replaceWorkerInSchedule, removeWorkerFromSchedule }= require('../utils/worker')

const removeWorker = async (req, res) => {
    const { shiftId, workerId, organizationId } = req.body

    try {

        let currentShift = await Schedule.findById(shiftId);
        if (!currentShift) {
            return res.status(404).send({ error: 'shift not found.' });
        }
        
        // add the worker to the replaceableWorkers array in the shift
        const workerIndexToRemove = currentShift.workers.findIndex((worker) => worker.id === workerId);
        if (workerIndexToRemove === -1) {
            return res.status(401).send({ error: 'worker not found.' });
        }
        //const workerToRemove = currentShift.workers[workerIndexToRemove];

        //currentShift.workers =currentShift.workers.filter((worker) => worker.id !== workerId);
        const [workerToRemove] = currentShift.workers.splice(workerIndexToRemove, 1);
        currentShift.replaceableWorkers.push(workerToRemove);
        await currentShift.save();

        const orgWorkers = await Workers.findOne({ organizationId, }).lean();
        const workers = orgWorkers.workers;

        const schedule = await Schedule.find({ organizationId, shiftDate: currentShift.shiftDate });
        findReplaceableWorkers(schedule, workers);
        await Promise.all(schedule.map((doc) => doc.save()));
        res.send({ message: 'Worker removed successfully.' });
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the schedule.' });
    }

};


const addWorker = async (req, res) => {
    const { shiftId, workerId, organizationId } = req.body

    try {

        let currentShift = await Schedule.findById(shiftId);
        if (!currentShift) {
            return res.status(404).send({ error: 'shift not found.' });
        }

        // Remove the worker from the replaceableWorkers array in the shift
        const workerIndexToAdd = currentShift.replaceableWorkers.findIndex((worker) => worker.id === workerId);
        if (workerIndexToAdd === -1) {
            return res.status(401).send({ error: 'worker not found.' });
        }
        const workerToAdd = currentShift.replaceableWorkers[workerIndexToAdd];

        currentShift.replaceableWorkers =currentShift.replaceableWorkers.filter((worker) => worker.id !== workerId);
        currentShift.workers.push(workerToAdd);
        await currentShift.save();

        const orgWorkers = await Workers.findOne({ organizationId, }).lean();
        const workers = orgWorkers.workers;

        const schedule = await Schedule.find({ organizationId, shiftDate: currentShift.shiftDate });
        findReplaceableWorkers(schedule, workers);
        await Promise.all(schedule.map((doc) => doc.save()));

        res.send({ message: 'Worker added successfully.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while updating the schedule.' });
    }

}

const replaceWorker =  async (req, res) => {
    const { shiftId, newWorkerId, oldWorkerId, organizationId } = req.body

    try {

        let currentShift = await Schedule.findById(shiftId);
        if (!currentShift) {
            return res.status(404).send({ error: 'shift not found.' });
        }

        // Remove the worker from the replaceableWorkers array in the shift
        const workerIndexToAdd = currentShift.replaceableWorkers.findIndex((worker) => worker.id === newWorkerId);
        if (workerIndexToAdd === -1) {
            return res.status(401).send({ error: 'worker not found.' });
        }
        const workerToAdd = currentShift.replaceableWorkers[workerIndexToAdd];

        currentShift.replaceableWorkers =currentShift.replaceableWorkers.filter((worker) => worker.id !== newWorkerId);
        currentShift.workers.push(workerToAdd);

        const workerIndexToRemove = currentShift.workers.findIndex((worker) => worker.id === oldWorkerId);
        if (workerIndexToRemove === -1) {
            return res.status(401).send({ error: 'worker not found.' });
        }

        const [workerToRemove] = currentShift.workers.splice(workerIndexToRemove, 1);
        currentShift.replaceableWorkers.push(workerToRemove);

        await currentShift.save();

        const orgWorkers = await Workers.findOne({ organizationId, }).lean();
        const workers = orgWorkers.workers;

        const schedule = await Schedule.find({ organizationId, shiftDate: currentShift.shiftDate });
        findReplaceableWorkers(schedule, workers);
        await Promise.all(schedule.map((doc) => doc.save()));

        res.send({ message: 'Worker added successfully.' });
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the schedule.' });
    }

}

const getWorkers = async (req, res) => {

    console.log(req.params)
    const { org_id } = req.params;  // Extract 'org_id' from req.params
    console.log(org_id);
    const workers = await Workers.findOne({ organizationId: org_id });
    if (!workers) {
        return res.status(404).json({ error: 'Workers not found' });
    }
    console.log(workers)
    res.json({ workers });
};

const changeUserName = async (req, res) => {
    try {
      const { newName, id } = req.body;  // Extract newName and id from the request body
  
      // Update the worker with the matching ID
      const updatedWorker = await Workers.findOneAndUpdate(
        { "workers.id": id },  // Find the worker by ID in the subdocument array
        { $set: { "workers.$.fullName": newName } },  // Update the fullName of the worker
        { new: true }  // Return the updated document
      );
  
      if (!updatedWorker) {
        return res.status(404).json({ error: "Worker not found" });
      }
  
      // Send the updated worker as the response
      res.json(updatedWorker);
    } catch (error) {
      console.error("Error updating worker:", error);
      res.status(500).json({ error: "Error updating worker" });
    }
  };


  
const changeSkill = async (req, res) => {
    const { id, index, skill } = req.body;

  try {
    // Find the worker by ID and update the skill at the given index
    const updatedWorker = await Workers.findOneAndUpdate(
      { 'workers.id': id },
      { $set: { [`workers.$.skills.${index}`]: skill } },
      { new: true }
    );

    if (updatedWorker) {
      res.json({ message: 'Skill updated successfully', updatedWorker });
    } else {
      res.status(404).json({ error: 'Worker not found' });
    }
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ error: 'An error occurred while updating skill' });
  }
  };

  const addNewWorker = async (req, res) => {
    const { org_id  } = req.params;
    const { id, fullName, skills } = req.body; // Extract worker details from request body

    try {
        // Find the organization by orgId and update its workers array
        const result = await Workers.findOneAndUpdate(
            { organizationId: org_id },
            { $push: { workers: { id, fullName, skills } } }, // Push new worker to the workers array
            { new: true, useFindAndModify: false } // Return the updated document
        );

        if (!result) {
            return res.status(404).send('Organization not found');
        }

        res.status(201).json(result); // Send back the updated organization
    } catch (error) {
        console.error('Error adding worker:', error);
        res.status(500).send('Server error');
    }
  }

  const removeWorkerList = async (req, res) => {
    try {
        const { workerId } = req.body;
        const { org_id } = req.params;

        // Use $pull to remove the worker from the workers array by id
        const updatedWorkers = await Workers.findOneAndUpdate(
        { organizationId: org_id }, // Find the document by organizationId
        { $pull: { workers: { id: workerId } } }, // Remove the worker with matching id from workers array
        { new: true } // Return the updated document
        );

        if (!updatedWorkers) {
        return res.status(404).json({ message: 'Organization or worker not found' });
        }

        // Return success message with updated workers list
        return res.status(200).json({ message: 'Worker successfully deleted', updatedWorkers });

      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
      }
  }


module.exports = {
    removeWorkerList,
    addNewWorker,
    changeSkill,
    changeUserName,
    getWorkers,
    removeWorker,
    addWorker,
    replaceWorker
}
