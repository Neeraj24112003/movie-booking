import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return res.status(404).json({ success: false, message: 'User not found' });

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return res.status(401).json({ success: false, message: 'Wrong credentials' });

        const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const logout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const addFunds = async (req, res, next) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) return res.status(400).json({ success: false, message: 'Invalid amount' });

        const user = await User.findById(req.user.id);
        user.walletBalance += Number(amount);
        await user.save();

        res.status(200).json({ success: true, message: "Funds added successfully", walletBalance: user.walletBalance });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, users });
    } catch (error) {
        next(error);
    }
};
