
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const ensureAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL);
        console.log(`Connected to DB: ${mongoose.connection.name}`);

        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists.');
        } else {
            console.log('No admin found. Please create one manually or update this script.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

ensureAdmin();
