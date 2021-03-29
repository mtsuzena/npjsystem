const db = require("../models");
const { getUser } = require("../services/user.service");
const User = db.user;

exports.getUsers = function () {
    return User.findAll({
        include: [{
            model: db.profile,
            include: {
                model: db.role
            }
        }]
    });
};

exports.getUser = function (id) {
    return User.findByPk(id, {
        include: [{
            model: db.profile,
            include: {
                model: db.role
            }
        }]
    });
};

exports.getUserByEmail = function (uemail) {
    return User.findOne({
        where: {
            email: uemail
        }
    });
};

exports.saveUser = function (user) {
	return User.create(user);
};

exports.saveUserWithProfile = async function (user, profile) {
    user.profileId = profile.id;
	return await User.create(user);
};

exports.deleteUser = function (id) {
	return User.destroy({
        where: {
            id: id
        }
    })
};

exports.updateUser = function (user) {
    user.save();
};