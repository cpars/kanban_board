import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // Verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    const isAdmin = process.env.SECRET_ADMIN || '';
    // Check if the user is an admin
    if (authHeader && authHeader === isAdmin) {
        req.user = { username: 'admin' };
        return next();
    }
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || '';
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403).json({ message: 'Token expired or invalid' });
            }
            req.user = user;
            return next();
        });
    }
    else {
        res.sendStatus(401); // Unauthorized
    }
};
