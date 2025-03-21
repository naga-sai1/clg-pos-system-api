const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Invalid Authorization header format" });
    }

    const token = authHeader.split(' ')[1];
    console.log("Extracted Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    console.log("JWT Secret:", process.env.JWT_SECRET);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please login again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Invalid token" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "You don't have permission to perform this action" 
            });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRole
};
