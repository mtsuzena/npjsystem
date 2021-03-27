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

exports.deleteRole = async function (id) {
    const existingRole = await rolesData.getRole(id)
    if (!existingRole) throw new Error('Role not found');
    return rolesData.deleteRole(id)
}

exports.updateRole = async function (id, role) {
    const existingRole = await rolesData.getRole(id)
    if (!existingRole) throw new Error('Role not found');
    existingRole.name = role.name;
    return rolesData.updateRole(existingRole);
}

