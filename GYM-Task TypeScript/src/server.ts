import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';
import authRoutes from "./routes/authRoutes";
import trainerRoutes from "./routes/trainerRoutes";
import classRoutes from "./routes/classRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import errorHandler from "./middlewares/errorMiddleware";

const app: Application = express();

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use(errorHandler);

// Server start
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});