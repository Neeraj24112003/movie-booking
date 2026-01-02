import Theater from '../models/Theater.js';

export const createTheater = async (req, res, next) => {
    try {
        const theater = await Theater.create(req.body);
        res.status(201).json(theater);
    } catch (error) {
        next(error);
    }
};

export const getTheaters = async (req, res, next) => {
    try {
        const theaters = await Theater.find();
        res.status(200).json(theaters);
    } catch (error) {
        next(error);
    }
};

export const getTheater = async (req, res, next) => {
    try {
        const theater = await Theater.findById(req.params.id);
        res.status(200).json(theater);
    } catch (error) {
        next(error);
    }
};
