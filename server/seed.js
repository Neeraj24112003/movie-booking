import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';
import Theater from './models/Theater.js';
import Show from './models/Show.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        if (process.env.FORCE_SEED !== 'true') {
            console.error('ERROR: Seeding overrides existing data!');
            console.error('To run safety, use: FORCE_SEED=true node seed.js');
            process.exit(1);
        }

        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Movie.deleteMany({});
        await Theater.deleteMany({});
        await Show.deleteMany({});
        // Better: Delete only non-archived shows. We need to find Archived Movie ID first?
        // Simpler: Just block the seed script entirely.



        // Create Movies
        const movies = await Movie.insertMany([
            {
                title: "Avatar: The Way of Water",
                description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
                duration: 192,
                genre: ["Action", "Adventure", "Sci-Fi"],
                language: "English",
                releaseDate: new Date("2022-12-16"),
                posterUrl: "https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
                trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0",
                rating: 7.6,
                format: ["2D", "3D", "IMAX"]
            },
            {
                title: "Oppenheimer",
                description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
                duration: 180,
                genre: ["Biography", "Drama", "History"],
                language: "English",
                releaseDate: new Date("2023-07-21"),
                posterUrl: "https://image.tmdb.org/t/p/original/8Gxv2mYrsUkbT999S7X4XpXenC8.jpg",
                trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
                rating: 8.4,
                format: ["2D", "IMAX"]
            }
        ]);

        // Create Theater
        const theater = await Theater.create({
            name: "PVR Cinemas",
            city: "Bangalore",
            location: "Forum Mall, Koramangala",
            screens: [
                {
                    name: "Screen 1",
                    screenType: "IMAX",
                    seatLayout: {
                        rows: 8,
                        cols: 10,
                        seats: [] // Will be empty or manually populated if needed, but we handle grid in UI
                    }
                }
            ]
        });

        // Create Shows
        const shows = [
            {
                movie: movies[0]._id,
                theater: theater._id,
                screenName: "Screen 1",
                startTime: new Date(new Date().setHours(18, 0, 0, 0)),
                endTime: new Date(new Date().setHours(21, 15, 0, 0)),
                price: { Classic: 250, Premium: 450, Prime: 600 },
                bookedSeats: []
            },
            {
                movie: movies[1]._id,
                theater: theater._id,
                screenName: "Screen 1",
                startTime: new Date(new Date().setHours(21, 30, 0, 0)),
                endTime: new Date(new Date().setHours(0, 30, 0, 0)),
                price: { Classic: 300, Premium: 500, Prime: 700 },
                bookedSeats: []
            }
        ];

        await Show.insertMany(shows);

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
