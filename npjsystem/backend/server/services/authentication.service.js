const userService = require('../services/user.service.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config')


exports.login = async function (login) {
    //Checking if the email exists
    const user = await userService.getUserByEmail(login.email);
    if (!user) throw new Error('Email or password is wrong');
    
    //Check if the password is correct
    const validatePassword = await bcrypt.compare(login.password, user.password);
    if(!validatePassword) throw new Error('Email or password is wrong');

    if(!user.userActive) throw new Error('Email or password is wrong');

    //Create and assign a token
    let token = '';
    if(user.profileId == null){
        token = jwt.sign({id: user.id, roles: []}, authConfig.TOKEN_SECRET, {expiresIn: "1d"});
    }else{
        token = jwt.sign({id: user.id, roles: user.profile.roles}, authConfig.TOKEN_SECRET, {expiresIn: "1d"});
    }

    return token;
}