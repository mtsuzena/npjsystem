const axios = require('axios');
const crypto = require('crypto');
const roleService = require('../services/role.service.js');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Shall get roles', async function () {
    // given - dado que
    const role1 = await roleService.saveRole({ name: generate() });
	const role2 = await roleService.saveRole({ name: generate() });
	const role3 = await roleService.saveRole({ name: generate() });
    // when - quando acontecer
	const response = await request('http://localhost:3000/roles', 'get');
    expect(response.status).toBe(200);
    console.log(response)
	const roles = response.data;
	//then - então
    expect(roles).toHaveLength(3);
    await roleService.deleteRole(role1.id);
    await roleService.deleteRole(role2.id);
    await roleService.deleteRole(role3.id);
});