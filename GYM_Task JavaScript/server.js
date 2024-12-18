const express = require('express');
const cors = require('cors');
const connectDB = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const classRoutes = require('./routes/classRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// Connect to database
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

