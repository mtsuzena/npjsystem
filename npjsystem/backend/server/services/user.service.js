const usersData = require('../datas/user.data.js');
const profileService = require('../services/profile.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config')

exports.getUsers = function () {
    return usersData.getUsers();
}

exports.getUser = async function (id) {
    return usersData.getUser(id);
}

exports.login = async function (login) {

    //Checking if the email exists
    const user = await usersData.getUserByEmail(login.email);
    if (!user) throw new Error('Email or password is wrong');
    
    //Check if the password is correct
    const validatePassword = await bcrypt.compare(login.password, user.password);
    if(!validatePassword) throw new Error('Email or password is wrong');

    //Create and assign a token
    const token = jwt.sign({id: user.id}, authConfig.TOKEN_SECRET);

    return token;
}

exports.saveUser = async function (data) {
    const { profileId, ...user } = data;

    const existingEmail = await usersData.getUserByEmail(user.email);
    if (existingEmail) throw new Error('Email already exists');

    //encriptar password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;

    if(profileId){
        const existingProfile = await profileService.getProfile(profileId);
        if (!existingProfile) throw new Error('Profile not found');

        return usersData.saveUserWithProfile(user, existingProfile);
    }else{
        return usersData.saveUser(user);
    }
}

exports.deleteUser = async function (id) {
    const existingUser = await usersData.getUser(id);
    if (!existingUser) throw new Error('User not found');
    return usersData.deleteUser(id);
}

exports.updateUser = async function (id, user) {
    const existingUser = await usersData.getUser(id);
    if (!existingUser) throw new Error('User not found');
    existingUser.name = user.name;
    existingUser.username = user.username;
    existingUser.email = user.email;
    existingUser.password = user.password;

    return usersData.updateUser(existingUser);
}

