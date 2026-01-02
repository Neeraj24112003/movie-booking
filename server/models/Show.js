import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    screenName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: {
        Regular: { type: Number, required: true },
        Premium: { type: Number },
        Recliner: { type: Number }
    },
    bookedSeats: [{
        seatNumber: String, // e.g., "A1"
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        lockedUntil: { type: Date } // For seat locking mechanism
    }]
}, { timestamps: true });

const Show = mongoose.model('Show', showSchema);
export default Show;
