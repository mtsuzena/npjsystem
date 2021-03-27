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


test('Shall save a role', async function () {
    const data = { name: generate() };
	const response = await request('http://localhost:3000/roles', 'post', data);
    expect(response.status).toBe(201);
	const role = response.data;
    expect(role.name).toBe(data.name);
    await roleService.deleteRole(role.id);
});

test('Shall not save a role', async function () {
    const data = { name: generate() };
	const response1 = await request('http://localhost:3000/roles', 'post', data);
    const response2 = await request('http://localhost:3000/roles', 'post', data);
    expect(response2.status).toBe(409);
	const role = response1.data;
    await roleService.deleteRole(role.id);
});

test.only('Shall update a role', async function () {
    const role = await roleService.saveRole({ name: generate() });
    role.name = generate();
	const response = await request(`http://localhost:3000/roles/${role.id}`, 'put', role);
    expect(response.status).toBe(204);
    const updatedRole = await roleService.getRole(role.id);
    expect(updatedRole.name).toBe(role.name);
    await roleService.deleteRole(role.id);
});

// test('Shall not update a post', async function () {
//     const post = {
//         id: 1
//     };
// 	const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post);
//     expect(response.status).toBe(404);
// });

// test('Shall delete a post', async function () {
//     const post = await postsService.savePost({ title: generate(), content: generate() });
// 	const response = await request(`http://localhost:3000/posts/${post.id}`, 'delete');
//     expect(response.status).toBe(204);
//     const posts = await postsService.getPosts();
//     expect(posts).toHaveLength(0);
// });