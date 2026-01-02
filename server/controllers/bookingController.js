import Booking from '../models/Booking.js';
import Show from '../models/Show.js';

export const createBooking = async (req, res, next) => {
    const { showId, seats, totalPrice } = req.body;
    try {
        const show = await Show.findById(showId);
        if (!show) return res.status(404).json({ message: 'Show not found' });

        // Check if seats are already booked
        const alreadyBooked = show.bookedSeats.some(bs => seats.includes(bs.seatNumber));
        if (alreadyBooked) return res.status(400).json({ message: 'One or more seats already booked' });

        const newBooking = new Booking({
            user: req.user.id,
            show: showId,
            seats,
            totalPrice,
            paymentStatus: 'Completed' // Mocking successful payment
        });

        await newBooking.save();

        // Update show booked seats
        seats.forEach(seat => {
            show.bookedSeats.push({ seatNumber: seat, userId: req.user.id });
        });
        await show.save();

        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
};

export const getUserBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate({
            path: 'show',
            populate: [{ path: 'movie' }, { path: 'theater' }]
        });
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};
