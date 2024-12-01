import { Router } from 'express';
import {
    getTrainers,
    addTrainer,
    getTrainerById,
    updateTrainer,
    deleteTrainer
} from '../controllers/trainerController';
import { protect } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/roleMiddleware';

const router = Router();

// All trainer routes should be protected and accessible only by admin
router.get('/', protect, getTrainers);
router.post('/', protect, isAdmin, addTrainer);
router.get('/:id', protect, getTrainerById);
router.put('/:id', protect, isAdmin, updateTrainer);
router.delete('/:id', protect, isAdmin, deleteTrainer);

export default router;