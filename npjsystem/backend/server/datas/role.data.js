const db = require("../models");
const Role = db.role;

exports.getRoles = function () {
    return Role.findAll();
};

exports.getRole = function (id) {
    return Role.findByPk(id);
};

exports.getRoleByName = function (roleName) {
    return Role.findOne({
        where: {
            name: roleName
        }
    });
};

exports.saveRole = function (role) {
	return Role.create(role)
};

exports.deleteRole = function (idRole) {
	return Role.destroy({
        where: {
            id: idRole
        }
    })
};

exports.updateRole = function (role) {
    role.save();
};