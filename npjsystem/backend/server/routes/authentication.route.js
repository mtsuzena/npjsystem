const express = require('express');
const router = express.Router();
const authenticationService = require('../services/authentication.service');

router.post('/login', async function (req, res, next){
    try {
        const token = await authenticationService.login(req.body);
        res.header('auth-token', token).send({
            token: token,
            message: "Successfully Authenticated"
        });
        
    } catch (error) {
        next(error);
    }
});


module.exports = router;