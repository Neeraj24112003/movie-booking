import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    genre: [{ type: String, required: true }],
    language: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    posterUrl: { type: String, required: true },
    trailerUrl: { type: String },
    rating: { type: Number, default: 0 },
    format: [{ type: String, enum: ['2D', '3D', 'IMAX'], default: ['2D'] }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
