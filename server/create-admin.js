
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        const adminCredentials = {
            username: 'Admin',
            email: 'admin@gmail.com',
            password: 'Pass@123',
            role: 'admin'
        };

        // Check if user exists
        const existingUser = await User.findOne({ email: adminCredentials.email });
        if (existingUser) {
            console.log('Admin user already exists. Updating role to admin just in case...');
            existingUser.role = adminCredentials.role;
            // Optional: Reset password if you want validation
            existingUser.password = bcrypt.hashSync(adminCredentials.password, 10);
            await existingUser.save();
            console.log('Admin user updated successfully.');
        } else {
            console.log('Creating new admin user...');
            const hashedPassword = bcrypt.hashSync(adminCredentials.password, 10);
            const newUser = new User({
                username: adminCredentials.username,
                email: adminCredentials.email,
                password: hashedPassword,
                role: adminCredentials.role
            });
            await newUser.save();
            console.log('Admin user created successfully.');
        }

        console.log('==========================================');
        console.log('CREDENTIALS:');
        console.log(`Email:    ${adminCredentials.email}`);
        console.log(`Password: ${adminCredentials.password}`);
        console.log('==========================================');

        process.exit();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
