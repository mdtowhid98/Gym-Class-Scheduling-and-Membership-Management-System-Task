import { Router } from 'express';
import {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass
} from '../controllers/classController';
import { protect } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/roleMiddleware';

const router = Router();

// Public route to view all classes
router.get('/', protect, getAllClasses);

// Protected route to get specific class details
router.get('/:id', protect, getClassById);

// Admin-only routes for class management
router.post('/', protect, isAdmin, createClass);
router.put('/:id', protect, isAdmin, updateClass);
router.delete('/:id', protect, isAdmin, deleteClass);

export default router;