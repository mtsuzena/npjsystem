const db = require("../models");
const Profile = db.profile;
const Role = db.role;

exports.getProfiles = function () {
    return Profile.findAll({
        include: [
            {
                model: Role,
                as: 'roles'
            }
        ],
    });
};

exports.getProfile = function (id) {
    return Profile.findByPk(id, {
        include: [
            {
                model: Role,
                as: 'roles'
            }
        ],
    });
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

exports.saveProfileWithRoles = async function (profile, roles) {
	const newProfile = await Profile.create(profile);
    await newProfile.addRole(roles);
    return newProfile;
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