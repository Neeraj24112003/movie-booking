import express from 'express';
import { createMovie, deleteMovie, getMovie, getMovies, updateMovie } from '../controllers/movieController.js';
import { verifyAdmin } from '../middleware/verifyUser.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/', verifyAdmin, createMovie);
router.put('/:id', verifyAdmin, updateMovie);
router.delete('/:id', verifyAdmin, deleteMovie);

export default router;
