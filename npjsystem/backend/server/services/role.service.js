const rolesData = require('../datas/role.data.js');

exports.getRoles = function () {
    return rolesData.getRoles();
}


exports.getRole = function (id) {
    return rolesData.getRole(id);
}

exports.saveRole = async function (role) {
    const existingRole = await rolesData.getRoleByName(role.name);
    if (existingRole) throw new Error('Role already exists');
    return rolesData.saveRole(role)
}

exports.deleteRole = function (id) {
    return rolesData.deleteRole(id)
}

exports.updateRole = async function (id, role) {

}

