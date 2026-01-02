import mongoose from 'mongoose';

const theaterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    screens: [{
        name: { type: String, required: true },
        screenType: { type: String, enum: ['Regular', 'IMAX', 'Premium'], default: 'Regular' },
        seatLayout: {
            rows: { type: Number, required: true },
            cols: { type: Number, required: true },
            seats: [{
                row: String,
                col: Number,
                seatType: { type: String, enum: ['Regular', 'Premium', 'Recliner'], default: 'Regular' },
                price: Number
            }]
        }
    }]
}, { timestamps: true });

const Theater = mongoose.model('Theater', theaterSchema);
export default Theater;
