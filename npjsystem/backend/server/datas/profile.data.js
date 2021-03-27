const db = require("../models");
const Profile = db.profile;

exports.getProfiles = function () {
    return Profile.findAll();
};

exports.getProfile = function (id) {
    return Profile.findByPk(id);
};

exports.getProfileByName = function (profileName) {
    return Profile.findOne({
        where: {
            name: profileName
        }
    });
};

exports.saveProfile = function (profile) {
	return Profile.create(profile)
};

exports.deleteProfile = function (idProfile) {
	return Profile.destroy({
        where: {
            id: idProfile
        }
    })
};

exports.updateProfile = function (profile) {
    profile.save();
};