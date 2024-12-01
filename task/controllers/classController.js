const ClassModel = require('../models/class');
const Trainer = require('../models/trainer');

// Fetch all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find().populate('trainer'); // Assuming `trainer` is a referenced field
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes' });
  }
};

// Create a new class
const createClass = async (req, res) => {
  const { title, date, time, trainerId } = req.body;

  try {
    // Ensure max 5 classes per day
    const classCount = await ClassModel.countDocuments({ date });
    if (classCount >= 5) {
      return res.status(400).json({ message: 'Max 5 classes allowed per day' });
    }

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(400).json({ message: 'Trainer not found' });
    }

    const newClass = new ClassModel({ title, date, time, trainer: trainerId });
    await newClass.save();
    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    res.status(500).json({ message: 'Error creating class' });
  }
};

// Get a specific class by ID
const getClassById = async (req, res) => {
  try {
    const classData = await ClassModel.findById(req.params.id).populate('trainer');
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class' });
  }
};

// Update a class
const updateClass = async (req, res) => {
  try {
    const updatedClass = await ClassModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ success: true, data: updatedClass });
  } catch (error) {
    res.status(500).json({ message: 'Error updating class' });
  }
};

// Delete a class
const deleteClass = async (req, res) => {
  try {
    const deletedClass = await ClassModel.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ success: true, message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting class' });
  }
};

module.exports = {
  getAllClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass,
};
