const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if there's a token
    if (!token) return res.status(401).json({
        msg: 'No token available, authorisation denied'
    });

    // Verify token
    try {
        // Decode the token
        const decode = jwt.verify(token, config.get('jwtSecret'));

        req.user = decode.user;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}