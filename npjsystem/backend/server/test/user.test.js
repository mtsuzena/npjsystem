const axios = require('axios');
const crypto = require('crypto');
const userService = require('../services/user.service.js');
const bcrypt = require('bcryptjs');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Shall get users', async function () {
    // given - dado que
    const user1 = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate()});
	const user2 = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena2@gmail.com', password: generate()});
	const user3 = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena3@gmail.com', password: generate()});
    // when - quando acontecer
	const response = await request('http://localhost:3000/api/users', 'get');
    expect(response.status).toBe(200);
	const users = response.data;
	//then - então
    expect(users).toHaveLength(3);
    await userService.deleteUser(user1.id);
    await userService.deleteUser(user2.id);
    await userService.deleteUser(user3.id);
});


test('Shall save a user', async function () {
    const data = { name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate() };
	const response = await request('http://localhost:3000/api/users', 'post', data);
    expect(response.status).toBe(201);
	const user = response.data;
    expect(user.name).toBe(data.name);
    expect(user.lastName).toBe(data.lastName);
    expect(user.email).toBe(data.email);
    const validatePassword = await bcrypt.compare(data.password, user.password);
    expect(true).toBe(validatePassword);
    await userService.deleteUser(user.id);
});

test('Shall not save a user duplicated', async function () {
    const data = { name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate() };
	const response1 = await request('http://localhost:3000/api/users', 'post', data);
    const response2 = await request('http://localhost:3000/api/users', 'post', data);
    expect(response2.status).toBe(409);
	const user = response1.data;
    await userService.deleteUser(user.id);
});

test('Shall not save a user with invalid email', async function () {
    const data = { name: generate(), lastName: generate(), email: generate(), password: generate() };
	const response = await request('http://localhost:3000/api/users', 'post', data);
    expect(response.status).toBe(400);
});

test('Shall update a user', async function () {
    const user = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate() });
    user.name = generate();
    user.lastName = generate();
    user.email = 'updatede@gmail.com';
    user.password = generate();
	const response = await request(`http://localhost:3000/api/users/${user.id}`, 'put', user);
    expect(response.status).toBe(204);
    const updatedUser = await userService.getUser(user.id);
    expect(updatedUser.name).toBe(user.name);
    expect(updatedUser.lastName).toBe(user.lastName);
    expect(updatedUser.email).toBe(user.email);
    expect(updatedUser.password).toBe(user.password);
    await userService.deleteUser(user.id);
});

test('Shall not update a user that does not exists', async function () {
    const user = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/users/${user.id}`, 'put', user);
    expect(response.status).toBe(404);
});

test('Shall delete a user', async function () {
    const user = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate() });
	const response = await request(`http://localhost:3000/api/users/${user.id}`, 'delete');
    expect(response.status).toBe(204);
    const users = await userService.getUsers();
    expect(users).toHaveLength(0);
});

test('Shall not delete a user', async function () {
    const user = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/users/${user.id}`, 'delete');
    expect(response.status).toBe(404);
});