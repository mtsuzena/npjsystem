const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const checkRoles = require('../helpers/checkRoles');
const userService = require('../services/user.service');

module.exports = async function (req, res, next, ){
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({errorMessage: 'Access Denied'});

    try {
        const verified = jwt.verify(token, authConfig.TOKEN_SECRET);
        req.user = verified;
        userService.getUser(verified.id).then((user) => {
            if(user.profileId == null) return res.status(401).send({errorMessage: 'Access Denied'});
            let check = checkRoles.check(req.originalUrl, req.method, user.profile.roles);
            if(!check) return res.status(401).send({errorMessage: 'Access Denied'});
            next();
        });
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}