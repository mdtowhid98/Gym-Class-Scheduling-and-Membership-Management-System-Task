import { Request, Response } from 'express';
import { Class } from '../models/class';
import { Trainer } from '../models/trainer';
import { ScheduleConflictError } from '../utils/errors';

export const getAllClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const classes = await Class.find().populate('trainer');
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes' });
  }
};

export const createClass = async (req: Request, res: Response): Promise<void> => {
  const { title, date, time, trainerId } = req.body;

  try {
    const classCount = await Class.countDocuments({ date });
    if (classCount >= 5) {
      res.status(400).json({ message: 'Max 5 classes allowed per day' });
      return;
    }

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      res.status(400).json({ message: 'Trainer not found' });
      return;
    }

    const newClass = new Class({ title, date, time, trainer: trainerId });
    await newClass.save();
    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    res.status(500).json({ message: 'Error creating class' });
  }
};

export const getClassById = async (req: Request, res: Response): Promise<void> => {
  try {
    const classData = await Class.findById(req.params.id).populate('trainer');
    if (!classData) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }
    res.status(200).json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class' });
  }
};

export const updateClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedClass) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }
    res.status(200).json({ success: true, data: updatedClass });
  } catch (error) {
    res.status(500).json({ message: 'Error updating class' });
  }
};

export const deleteClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      res.status(404).json({ message: 'Class not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting class' });
  }
};

export const validateScheduleTime = async (date: Date, time: string): Promise<void> => {
  const classCount = await Class.countDocuments({
    date: {
      $gte: new Date(date).setHours(0, 0, 0),
      $lt: new Date(date).setHours(23, 59, 59)
    }
  });

  if (classCount >= 5) {
    throw new ScheduleConflictError('Maximum daily class limit reached');
  }

  const overlappingClass = await Class.findOne({
    date: date,
    time: time
  });

  if (overlappingClass) {
    throw new ScheduleConflictError('Class schedule overlaps with existing class');
  }
};