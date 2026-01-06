import express from 'express';
import { login, logout, register, getCurrentUser, addFunds, getAllUsers } from '../controllers/authController.js';
import { verifyToken, verifyAdmin } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', verifyToken, getCurrentUser);
router.post('/add-funds', verifyToken, addFunds);
router.get('/all-users', verifyAdmin, getAllUsers);

export default router;
