import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupDir = path.join(__dirname, '../backup');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

const collections = ['users', 'movies', 'shows', 'bookings', 'theaters'];

async function backup() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB Connection Successful');

        const db = mongoose.connection.db;

        for (const collectionName of collections) {
            console.log(`Backing up ${collectionName}...`);
            const data = await db.collection(collectionName).find({}).toArray();
            fs.writeFileSync(
                path.join(backupDir, `${collectionName}.json`),
                JSON.stringify(data, null, 2)
            );
            console.log(`Saved ${data.length} records to ${collectionName}.json`);
        }

        console.log('Backup completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Backup failed:', error);
        process.exit(1);
    }
}

backup();
