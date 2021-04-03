const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config')

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    // if (!token) throw new Error('Access Denied');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, authConfig.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}