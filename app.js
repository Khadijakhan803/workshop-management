const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const workshopRoutes = require('./routes/workshopRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workshops', workshopRoutes);
app.use('/api/users', userRoutes);
app.use('/', authRoutes); // Add auth routes

// Database connection
connectDB();

module.exports = app;