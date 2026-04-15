require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const startReminderCron = require('./utils/reminderCron');

const staffRoutes = require('./routes/staff');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB().then(() => {
    // Start time reminder cron after DB is connected
    startReminderCron();
});

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running.',
        data: {
            api: 'running',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development'
        }
    });
});

// Routes
app.use('/api/staff', staffRoutes);
app.use('/api/user', userRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
