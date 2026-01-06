import express from 'express';
import { createTheater, getTheater, getTheaters, updateTheater, deleteTheater } from '../controllers/theaterController.js';
import { verifyAdmin } from '../middleware/verifyUser.js';

const router = express.Router();

router.get('/', getTheaters);
router.get('/:id', getTheater);
router.post('/', verifyAdmin, createTheater);
router.put('/:id', verifyAdmin, updateTheater);
router.delete('/:id', verifyAdmin, deleteTheater);

export default router;
