const axios = require('axios');
const crypto = require('crypto');
const roleService = require('../services/role.service.js');
const cfgs = require('../config/auth.config');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, headers: {'auth-token': cfgs.JWT_USER}, validateStatus: false });
};

test('Shall get roles', async function () {
    // given - dado que
    const role1 = await roleService.saveRole({ name: generate() });
	const role2 = await roleService.saveRole({ name: generate() });
	const role3 = await roleService.saveRole({ name: generate() });
    // when - quando acontecer
	const response = await request('http://localhost:3000/api/roles', 'get');
    expect(response.status).toBe(200);
    console.log(response)
	const roles = response.data;
	//then - então
    expect(roles).toHaveLength(3);
    await roleService.deleteRole(role1.id);
    await roleService.deleteRole(role2.id);
    await roleService.deleteRole(role3.id);
});


test('Shall save a role', async function () {
    const data = { name: generate() };
	const response = await request('http://localhost:3000/api/roles', 'post', data);
    expect(response.status).toBe(201);
	const role = response.data;
    expect(role.name).toBe(data.name);
    await roleService.deleteRole(role.id);
});

test('Shall not save a role', async function () {
    const data = { name: generate() };
	const response1 = await request('http://localhost:3000/api/roles', 'post', data);
    const response2 = await request('http://localhost:3000/api/roles', 'post', data);
    expect(response2.status).toBe(409);
	const role = response1.data;
    await roleService.deleteRole(role.id);
});

test('Shall update a role', async function () {
    const role = await roleService.saveRole({ name: generate() });
    role.name = generate();
	const response = await request(`http://localhost:3000/api/roles/${role.id}`, 'put', role);
    expect(response.status).toBe(204);
    const updatedRole = await roleService.getRole(role.id);
    expect(updatedRole.name).toBe(role.name);
    await roleService.deleteRole(role.id);
});

test('Shall not update a role', async function () {
    const role = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/roles/${role.id}`, 'put', role);
    expect(response.status).toBe(404);
});

test('Shall delete a role', async function () {
    const role = await roleService.saveRole({ name: generate() });
	const response = await request(`http://localhost:3000/api/roles/${role.id}`, 'delete');
    expect(response.status).toBe(204);
    const roles = await roleService.getRoles();
    expect(roles).toHaveLength(0);
});

test('Shall not delete a role', async function () {
    const role = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/roles/${role.id}`, 'delete');
    expect(response.status).toBe(404);
});