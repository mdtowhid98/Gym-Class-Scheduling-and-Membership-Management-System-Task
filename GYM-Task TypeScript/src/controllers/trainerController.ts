import { Request, Response } from 'express';
import { Trainer } from '../models/trainer';

export const getTrainers = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json({ success: true, data: trainers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainers' });
  }
};

export const addTrainer = async (req: Request, res: Response): Promise<void> => {
  const { name, experience } = req.body;

  try {
    const trainer = new Trainer({ name, experience });
    await trainer.save();
    res.status(201).json({ success: true, data: trainer });
  } catch (error) {
    res.status(500).json({ message: 'Error adding trainer' });
  }
};

export const getTrainerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      res.status(404).json({ message: 'Trainer not found' });
      return;
    }
    res.status(200).json({ success: true, data: trainer });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainer' });
  }
};

export const updateTrainer = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!trainer) {
      res.status(404).json({ message: 'Trainer not found' });
      return;
    }
    res.status(200).json({ success: true, data: trainer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating trainer' });
  }
};

export const deleteTrainer = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      res.status(404).json({ message: 'Trainer not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Trainer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trainer' });
  }
};