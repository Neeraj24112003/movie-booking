import express from 'express';
import { createShow, getShowDetails, getShows, deleteShow, updateShow } from '../controllers/showController.js';
import { verifyAdmin } from '../middleware/verifyUser.js';

const router = express.Router();

router.get('/', getShows);
router.get('/:id', getShowDetails);
router.post('/', verifyAdmin, createShow);
router.put('/:id', verifyAdmin, updateShow);
router.delete('/:id', verifyAdmin, deleteShow);

export default router;
