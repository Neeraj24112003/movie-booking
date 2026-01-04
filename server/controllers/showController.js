import Show from '../models/Show.js';

export const deleteShow = async (req, res, next) => {
    try {
        await Show.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Show deleted' });
    } catch (error) {
        next(error);
    }
};

export const createShow = async (req, res, next) => {
    try {
        const { startTime, duration } = req.body; // duration from movie
        const endTime = new Date(new Date(startTime).getTime() + req.body.duration * 60000);
        const show = await Show.create({ ...req.body, endTime });
        res.status(201).json(show);
    } catch (error) {
        next(error);
    }
};

export const getShows = async (req, res, next) => {
    try {
        const { movieId, theaterId, date } = req.query;
        let query = {};
        if (movieId) query.movie = movieId;
        if (theaterId) query.theater = theaterId;


        const shows = await Show.find(query).populate('movie').populate('theater');
        res.status(200).json(shows);
    } catch (error) {
        next(error);
    }
};

export const getShowDetails = async (req, res, next) => {
    try {
        const show = await Show.findById(req.params.id).populate('movie').populate('theater');
        res.status(200).json(show);
    } catch (error) {
        next(error);
    }
};

export const updateShow = async (req, res, next) => {
    try {
        const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(show);
    } catch (error) {
        next(error);
    }
};
