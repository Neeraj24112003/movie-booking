import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    seats: [{ type: String, required: true }],
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    paymentId: { type: String },
    bookingDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
