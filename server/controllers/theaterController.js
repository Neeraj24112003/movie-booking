import Theater from '../models/Theater.js';

export const updateTheater = async (req, res, next) => {
    try {
        const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(theater);
    } catch (error) {
        next(error);
    }
};

export const deleteTheater = async (req, res, next) => {
    try {
        await Theater.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Theater deleted' });
    } catch (error) {
        next(error);
    }
};

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
        console.log(`[API] getTheaters found ${theaters.length} theaters`);
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
