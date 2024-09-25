const { Shift } = require('../schema/shift');

const getShifts = async (req, res) => {

  const { org_id } = req.params;  // Extract 'org_id' from req.params
  console.log(org_id);
  const shifts = await Shift.findOne({ organizationId: org_id });
  if (!shifts) {
    return res.status(404).json({ error: 'Workers not found' });
  }
  console.log(shifts)
  res.json({ shifts });
};

const changeShiftDate = async (req, res) => {
  const { newDate, index } = req.body; // Use index instead of id
  const { orgId } = req.params;

  try {
    const updatedShift = await Shift.updateOne(
      { organizationId: orgId },
      { $set: { [`shifts.${index}.day`]: newDate } } // Access the day using the index
    );

    console.log("updatedShift", updatedShift)
    if (updatedShift.modifiedCount > 0) {
      res.status(200).json({ message: 'Shift date updated successfully.' });
    } else {
      throw new Error("Shift not found or no changes made.");
    }
  } catch (error) {
    console.error('Error updating shift date:', error);
    res.status(500).json({ error });
  }
}

const changeShiftStartTime = async (req, res) => {
  const { newStartTime, index } = req.body; // Change id to index
  const { orgId } = req.params;

  try {
    const updatedShift = await Shift.updateOne(
      { organizationId: orgId }, // Only filter by organizationId
      { $set: { [`shifts.${index}.start_hour`]: newStartTime } } // Use index to update start_hour
    );

    if (updatedShift.modifiedCount > 0) {
      res.status(200).json({ message: 'Shift start time updated successfully.' });
    } else {
      res.status(404).json({ message: 'Shift not found or no changes made.' });
    }
  } catch (error) {
    console.error('Error updating shift start time:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const changeShiftEndTime = async (req, res) => {
  const { newEndTime, index } = req.body; // Change id to index
  const { orgId } = req.params;

  try {
    const updatedShift = await Shift.updateOne(
      { organizationId: orgId }, // Filter by organizationId
      { $set: { [`shifts.${index}.end_hour`]: newEndTime } } // Use index to update end_hour
    );

    if (updatedShift.modifiedCount > 0) {
      res.status(200).json({ message: 'Shift end time updated successfully.' });
    } else {
      res.status(404).json({ message: 'Shift not found or no changes made.' });
    }
  } catch (error) {
    console.error('Error updating shift end time:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const changeNumberOfWorkers = async (req, res) => {
  const { newNumberOfWorkers, index } = req.body; // Change id to index
  const { orgId } = req.params;

  try {
    const updatedShift = await Shift.updateOne(
      { organizationId: orgId }, // Filter by organizationId
      { $set: { [`shifts.${index}.number_of_workers`]: newNumberOfWorkers } } // Use index to update number_of_workers
    );

    console.log("updatedShifttt", updatedShift)
    if (updatedShift.modifiedCount > 0) {
      res.status(200).json({ message: 'Number of workers updated successfully.' });
    } else {
      res.status(404).json({ message: 'Shift not found or no changes made.' });
    }
  } catch (error) {
    console.error('Error updating number of workers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const changeSkillShift = async (req, res) => {
  const { newSkill, id } = req.body;
  const { orgId } = req.params;

  try {
    const updatedShift = await Shift.updateOne(
      { organizationId: orgId }, // Filter by organizationId
      { $set: { [`shifts.${id}.skill`]: newSkill } } // Use index to update number_of_workers
    );

    if (updatedShift.modifiedCount > 0) {
      res.status(200).json({ message: 'Skill updated successfully.' });
    } else {
      res.status(404).json({ message: 'Shift not found.' });
    }
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const changeCostPerWorker = async (req, res) => {
  const { newCost, id } = req.body;
  const { orgId } = req.params;

  try {
    const updatedShift = await Shift.updateOne(
      { organizationId: orgId },
      { $set: { [`shifts.${id}.cost_per_worker`]: newCost } }
    );


    if (updatedShift.modifiedCount > 0) {
      res.status(200).json({ message: 'Cost updated successfully.' });
    } else {
      res.status(404).json({ message: 'Shift not found.' });
    }
  } catch (error) {
    console.error('Error updating cost:', error);
    res.status(500).json({ error });
  }
}


const removeShift = async (req, res) => {
  const { shiftId } = req.body;
  const { orgId } = req.params;

  try {
    const orgShifts = await Shift.findOne(
      { organizationId: orgId },
    );

    if (!orgShifts) {
      return res.status(404).json({ message: 'Organization shifts cannot be found.' });
    }
    orgShifts.shifts.splice(shiftId, 1);

    await orgShifts.save();

    res.status(200).json({ message: 'Shift removed successfully.' });

  } catch (error) {
    console.error('Error removing shift:', error);
    res.status(500).json({ error });
  }
}

const addShift = async (req, res) => {
  const { newShift } = req.body;
  const { orgId } = req.params;

  try {
    const orgShifts = await Shift.findOne(
      { organizationId: orgId },
    );

    if (!orgShifts) {
      return res.status(404).json({ message: 'Organization shifts cannot be found.' });
    }
    orgShifts.shifts.push(newShift);

    await orgShifts.save();

    res.status(200).json({ message: 'Shift added successfully.' });

  } catch (error) {
    console.error('Error adding shift:', error);
    res.status(500).json({ error });
  }
}

module.exports = {
  getShifts,
  changeShiftDate,
  changeShiftStartTime,
  changeShiftEndTime,
  changeNumberOfWorkers,
  changeSkillShift,
  changeCostPerWorker,
  removeShift,
  addShift,
}
