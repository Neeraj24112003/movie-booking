import express from 'express';
import { createBooking, getUserBookings, cancelBooking, getAllBookings } from '../controllers/bookingController.js';
import { verifyToken, verifyAdmin } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, createBooking);
router.get('/user', verifyToken, getUserBookings);
router.post('/cancel/:id', verifyToken, cancelBooking);
router.get('/all-bookings', verifyAdmin, getAllBookings);

export default router;
