import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log('[AUTH] Verifying token:', token ? 'Present' : 'Missing');

    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('[AUTH] Token verification failed:', err.message);
            return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
        }
        console.log('[AUTH] User verified:', user.email, user.role);
        req.user = user;
        next();
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }
    });
};
