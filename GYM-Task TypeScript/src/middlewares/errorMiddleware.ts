import { Request, Response, NextFunction } from 'express';

interface ErrorWithDetails extends Error {
    details?: any;
    statusCode?: number;
}

const errorHandler = (
    err: ErrorWithDetails,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || res.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message,
        errorDetails: err.details || null,
    });
};

export default errorHandler;