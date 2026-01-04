
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
            console.log(`Email: ${existingAdmin.email}`);
            // We don't know the password, so we'll create a new known admin if needed, 
            // or reset this one's password. Let's create a backup admin if the existing one isn't our test one.
            if (existingAdmin.email !== 'admin@test.com') {
                // Create our test admin
                const hashedPassword = bcrypt.hashSync('admin123', 10);
                const testAdmin = await User.findOneAndUpdate(
                    { email: 'admin@test.com' },
                    {
                        username: 'AdminTest',
                        password: hashedPassword,
                        role: 'admin',
                        profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    },
                    { upsert: true, new: true }
                );
                console.log('Test Admin ready: admin@test.com / admin123');
            } else {
                console.log('Test Admin already exists: admin@test.com');
            }
        } else {
            const hashedPassword = bcrypt.hashSync('admin123', 10);
            await User.create({
                username: 'Admin',
                email: 'admin@test.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Created Admin: admin@test.com / admin123');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

ensureAdmin();
