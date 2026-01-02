import express from 'express';
import { createShow, getShowDetails, getShows } from '../controllers/showController.js';
import { verifyAdmin } from '../middleware/verifyUser.js';

const router = express.Router();

router.get('/', getShows);
router.get('/:id', getShowDetails);
router.post('/', verifyAdmin, createShow);

export default router;
