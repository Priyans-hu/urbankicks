const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const isAuth = (req, res, next) => {
    // Check if the JWT cookie exists
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);
        
        // Attach the user ID to the request object
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

module.exports = isAuth;