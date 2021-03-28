const db = require("../models");
const User = db.user;

exports.getUsers = function () {
    return User.findAll();
};

exports.getUser = function (id) {
    return User.findByPk(id);
};

exports.getUserByUserName = function (uname) {
    return User.findOne({
        where: {
            username: uname
        }
    });
};

exports.saveUser = function (user) {
	return User.create(user);
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