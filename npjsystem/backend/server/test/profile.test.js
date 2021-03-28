const axios = require('axios');
const crypto = require('crypto');
const profileService = require('../services/profile.service.js');
const roleService = require('../services/role.service.js');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Shall get profiles', async function () {
    // given - dado que
    const profile1 = await profileService.saveProfile({ name: generate(), description: generate() });
	const profile2 = await profileService.saveProfile({ name: generate(), description: generate() });
	const profile3 = await profileService.saveProfile({ name: generate(), description: generate() });
    // // when - quando acontecer
	const response = await request('http://localhost:3000/profiles', 'get');
    expect(response.status).toBe(200);
    console.log(response)
	const profiles = response.data;
	//then - então
    expect(profiles).toHaveLength(3);
    await profileService.deleteProfile(profile1.id);
    await profileService.deleteProfile(profile2.id);
    await profileService.deleteProfile(profile3.id);
});


test('Shall save a profiles', async function () {
    const data = { name: generate(), description: generate() };
	const response = await request('http://localhost:3000/profiles', 'post', data);
    expect(response.status).toBe(201);
	const profile = response.data;
    expect(profile.name).toBe(data.name);
    expect(profile.description).toBe(data.description);
    await profileService.deleteProfile(profile.id);
});

// test.only('Shall save a profiles with roles', async function () {
//     const role1 = await roleService.saveRole({ name: generate() });
// 	const role2 = await roleService.saveRole({ name: generate() });

//     const data = { name: generate(), description: generate(), roles: [role1.id, role2.id]};
// 	const response = await request('http://localhost:3000/profiles', 'post', data);
//     expect(response.status).toBe(201);

//     // const profile = await profileService.getProfile(response.id);

//     const response2 = await request('http://localhost:3000/profiles', 'get');

//     const profile = response2.data;

//     expect(profile.name).toBe(data.name);
//     expect(profile.description).toBe(data.description);
//     expect(profile.roles[0].name).toBe(role1.name);
//     expect(profile.roles[1].name).toBe(role2.name);

//     await profileService.deleteProfile(profile.id);
//     await roleService.deleteRole(role1.id);
//     await roleService.deleteRole(role2.id);
// });

test('Shall not save a profiles', async function () {
    const data = { name: generate(), description: generate() };
	const response1 = await request('http://localhost:3000/profiles', 'post', data);
    const response2 = await request('http://localhost:3000/profiles', 'post', data);
    expect(response2.status).toBe(409);
	const profile = response1.data;
    await profileService.deleteProfile(profile.id);
});

test('Shall update a profiles', async function () {
    const profile = await profileService.saveProfile({ name: generate(), description: generate() });
    profile.name = generate();
    profile.description = generate();
	const response = await request(`http://localhost:3000/profiles/${profile.id}`, 'put', profile);
    expect(response.status).toBe(204);
    const updatedProfile = await profileService.getProfile(profile.id);
    expect(updatedProfile.name).toBe(profile.name);
    expect(updatedProfile.description).toBe(profile.description);
    await profileService.deleteProfile(profile.id);
});

test('Shall not update a profiles', async function () {
    const profile = {
        id: 1
    };
	const response = await request(`http://localhost:3000/profiles/${profile.id}`, 'put', profile);
    expect(response.status).toBe(404);
});

test('Shall delete a profiles', async function () {
    const profile = await profileService.saveProfile({ name: generate(), description: generate() });
	const response = await request(`http://localhost:3000/profiles/${profile.id}`, 'delete');
    expect(response.status).toBe(204);
    const profiles = await profileService.getProfiles();
    expect(profiles).toHaveLength(0);
});

test('Shall not delete a profiles', async function () {
    const profile = {
        id: 1
    };
	const response = await request(`http://localhost:3000/profiles/${profile.id}`, 'delete');
    expect(response.status).toBe(404);
});