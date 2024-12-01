import { Router } from 'express';
import { registerUser, loginUser, createAdmin } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/create-admin', createAdmin);
router.post('/login', loginUser);

export default router;