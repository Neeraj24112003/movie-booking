import Movie from '../models/Movie.js';
import mongoose from 'mongoose';

export const createMovie = async (req, res, next) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
};

export const getMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();
        console.log(`[API] getMovies found ${movies.length} movies`);
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
};

export const getMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};

export const updateMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};

export const deleteMovie = async (req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Movie deleted' });
    } catch (error) {
        next(error);
    }
};
