import express from 'express';
import { createTheater, getTheater, getTheaters } from '../controllers/theaterController.js';
import { verifyAdmin } from '../middleware/verifyUser.js';

const router = express.Router();

router.get('/', getTheaters);
router.get('/:id', getTheater);
router.post('/', verifyAdmin, createTheater);

export default router;
