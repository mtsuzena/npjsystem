const rolesData = require('../datas/role.data.js');

exports.getRoles = function () {
    return rolesData.getRoles();
}

exports.saveRole = async function (role) {
    // const existingRole = await rolesData.getPostByTitle(post.title);
    // if (existingRole) throw new Error('Post already exists');
    return rolesData.saveRole(role)
}

exports.deleteRole = function (id) {
    return rolesData.deleteRole(id)
}