import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRouter from './routes/authRoute.js';
import movieRouter from './routes/movieRoute.js';
import theaterRouter from './routes/theaterRoute.js';
import showRouter from './routes/showRoute.js';
import bookingRouter from './routes/bookingRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());


app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174'],
    credentials: true
}));
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL)
    .then(() => console.log(`Connected to MongoDB: ${mongoose.connection.name}`))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theaters', theaterRouter);
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);

app.get('/api', (req, res) => {
    res.send('Online Movie Ticket Booking API is running...');
});

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
