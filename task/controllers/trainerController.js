const Trainer = require('../models/trainer');

// Fetch all trainers
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json({ success: true, data: trainers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainers' });
  }
};

// Add a new trainer
const addTrainer = async (req, res) => {
  const { name, experience } = req.body;

  try {
    const trainer = new Trainer({ name, experience });
    await trainer.save();
    res.status(201).json({ success: true, data: trainer });
  } catch (error) {
    res.status(500).json({ message: 'Error adding trainer' });
  }
};

// Get a specific trainer by ID
const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json({ success: true, data: trainer });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainer' });
  }
};

// Update a trainer
const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json({ success: true, data: trainer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating trainer' });
  }
};

// Delete a trainer
const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json({ success: true, message: 'Trainer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trainer' });
  }
};

module.exports = {
  getTrainers,
  addTrainer,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};
