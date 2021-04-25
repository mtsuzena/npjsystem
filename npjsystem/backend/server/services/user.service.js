const usersData = require('../datas/user.data.js');
const profileService = require('../services/profile.service');
const bcrypt = require('bcryptjs');
const validator = require('email-validator');
const consultationService = require('../services/consultation.service');
const { user } = require('../models/index.js');

exports.getUsers = async function () {
    const users = await usersData.getUsers();
    return users;
}

exports.getUserFreeOnDate = async function (date) {
    const users = await usersData.getUsers();
    const consultations = await consultationService.getConsultationsByDate(date);

    var responsibles = [];

    users.forEach((responsible, i) => {

        let isFree = true;

        consultations.forEach((consultation, i) => {
            if(responsible.id == consultation.userId){
                isFree = false;
            }
        });

        if(isFree){
            responsibles.push(responsible);
        }
    });

    return responsibles;
}

exports.getUser = async function (id) {
    const user = await usersData.getUser(id);
    return user;
}

exports.getUserByEmail = async function(email){
    const user = await usersData.getUserByEmail(email)
    return user;
}

exports.saveUser = async function (data) {
    const { profileId, ...user } = data;

    isEmailValid = validator.validate(user.email);
    if (!isEmailValid) throw new Error('Email invalid');

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
    existingUser.lastName = user.lastName;
    existingUser.email = user.email;
    existingUser.password = user.password;
    existingUser.userActive = user.userActive;
    existingUser.profileId = user.profileId;


    return usersData.updateUser(existingUser);
}
