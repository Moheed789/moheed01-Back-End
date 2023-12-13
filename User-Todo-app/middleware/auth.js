const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;
