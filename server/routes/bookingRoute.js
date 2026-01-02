import express from 'express';
import { createBooking, getUserBookings } from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, createBooking);
router.get('/user', verifyToken, getUserBookings);

export default router;
