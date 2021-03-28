const usersData = require('../datas/user.data.js');

exports.getUsers = function () {
    return usersData.getUsers();
}


exports.getUser = function (id) {
    return usersData.getUser(id);
}

exports.saveUser = async function (data) {
    const user = data;

    const existingUser = await usersData.getUserByUserName(user.username);
    if (existingUser) throw new Error('User already exists');

    return usersData.saveUser(user);
    
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

