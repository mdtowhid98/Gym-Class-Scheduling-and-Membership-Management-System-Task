import { Response, NextFunction } from 'express';
import {AuthRequest} from "./authMiddleware";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Admin role required.'
        });
    }
};

export const isTrainer = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === 'trainer') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Trainer role required.'
        });
    }
};

export const isTrainee = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === 'trainee') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Trainee role required.'
        });
    }
};