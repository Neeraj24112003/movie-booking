import Booking from '../models/Booking.js';
import Show from '../models/Show.js';
import User from '../models/User.js';

export const createBooking = async (req, res, next) => {
    const { showId, seats, totalPrice, useWallet } = req.body;
    try {
        const show = await Show.findById(showId);
        if (!show) return res.status(404).json({ message: 'Show not found' });

        // Check if seats are already booked
        const alreadyBooked = show.bookedSeats.some(bs => seats.includes(bs.seatNumber));
        if (alreadyBooked) return res.status(400).json({ message: 'One or more seats already booked' });

        let amountPaidByWallet = 0;
        const user = await User.findById(req.user.id);

        if (useWallet && user.walletBalance > 0) {
            if (user.walletBalance >= totalPrice) {
                amountPaidByWallet = totalPrice;
            } else {
                amountPaidByWallet = user.walletBalance;
            }
        }

        const newBooking = new Booking({
            user: req.user.id,
            show: showId,
            seats,
            totalPrice,
            paymentStatus: 'Completed',
            paymentId: 'DIRECT_BOOKING', // Simplified for non-payment flow
            amountPaidByWallet
        });

        await newBooking.save();

        // Deduct from wallet if used
        if (amountPaidByWallet > 0) {
            user.walletBalance -= amountPaidByWallet;
            await user.save();
        }

        // Update show booked seats
        seats.forEach(seat => {
            show.bookedSeats.push({ seatNumber: seat, userId: req.user.id });
        });
        await show.save();

        res.status(201).json({
            success: true,
            message: "Booking successful",
            booking: newBooking,
            walletDeducted: amountPaidByWallet
        });
    } catch (error) {
        next(error);
    }
};

export const getUserBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate({
            path: 'show',
            populate: [{ path: 'movie' }, { path: 'theater' }]
        }).sort({ createdAt: -1 });

        // Filter out bookings where show, movie, or theater is missing
        const validBookings = bookings.filter(booking =>
            booking.show && booking.show.movie && booking.show.theater
        );

        res.status(200).json(validBookings);
    } catch (error) {
        next(error);
    }
};

export const cancelBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Use do not have permission to cancel this booking" });
        }

        if (booking.paymentStatus === 'Cancelled') {
            return res.status(400).json({ success: false, message: "Booking is already cancelled" });
        }

        const show = await Show.findById(booking.show);

        // Fix: Only refund the portion paid by wallet back to wallet
        const walletRefund = (booking.amountPaidByWallet || 0) * 0.8;

        // 1. Update Booking
        booking.paymentStatus = 'Cancelled';
        booking.refundAmount = walletRefund; // Record only what was actually refunded to wallet
        await booking.save();

        // 2. Update User Wallet
        const user = await User.findById(req.user.id);
        if (walletRefund > 0) {
            user.walletBalance += walletRefund;
            await user.save();
        }

        // 3. Release Seats
        if (show) {
            show.bookedSeats = show.bookedSeats.filter(seat =>
                !(booking.seats.includes(seat.seatNumber) && seat.userId.toString() === req.user.id)
            );
            await show.save();
        }

        res.status(200).json({ success: true, message: "Booking cancelled successfully", refundAmount: walletRefund, newBalance: user.walletBalance });

    } catch (error) {
        next(error);
    }
};

export const getAllBookings = async (req, res, next) => {
    try {
        // Populate show -> movie/theater, and user
        const bookings = await Booking.find()
            .populate('user', '-password')
            .populate({
                path: 'show',
                populate: [
                    { path: 'movie', model: 'Movie' },
                    { path: 'theater', model: 'Theater' }
                ]
            })
            .sort({ createdAt: -1 });

        // Filter out bookings where show, movie, or theater is missing
        const validBookings = bookings.filter(booking =>
            booking.show && booking.show.movie && booking.show.theater
        );

        res.status(200).json({ success: true, data: validBookings });
    } catch (error) {
        next(error);
    }
};
