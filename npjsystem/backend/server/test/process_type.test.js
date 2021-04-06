const axios = require('axios');
const processTypeService = require('../services/processType.service');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Shall get processTypes', async function () {
    // given - dado que
    const processType1 = await processTypeService.saveProcessType({ name: generate() });
    const processType2 = await processTypeService.saveProcessType({ name: generate() });
    const processType3 = await processTypeService.saveProcessType({ name: generate() });
    
    // when - quando acontecer
	const response = await request('http://localhost:3000/api/processTypes', 'get');

    expect(response.status).toBe(200);

	const processTypes = response.data;
	//then - então
    expect(processTypes).toHaveLength(3);
    await processTypeService.deleteProcessType(processType1.id);
    await processTypeService.deleteProcessType(processType2.id);
    await processTypeService.deleteProcessType(processType3.id);
});

test('Shall save a processType', async function () {
    const data = { name: generate() };

	const response = await request('http://localhost:3000/api/processTypes', 'post', data);

    expect(response.status).toBe(201);

	const processType = response.data;

    expect(processType.name).toBe(data.name);

    await processTypeService.deleteProcessType(processType.id);
});

test('Shall not save a processType duplicated', async function () {
    const data = { name: generate() };

	const response1 = await request('http://localhost:3000/api/processTypes', 'post', data);
    const response2 = await request('http://localhost:3000/api/processTypes', 'post', data);

    expect(response2.status).toBe(409);

	const processType = response1.data;
    await processTypeService.deleteProcessType(processType.id);
});

test('Shall update a processType', async function () {

    const data = { name: generate() };

    const processType = await processTypeService.saveProcessType(data); 

    processType.name = generate();

	const response = await request(`http://localhost:3000/api/processTypes/${processType.id}`, 'put', processType);

    expect(response.status).toBe(204);

    const updatedProcessType = await processTypeService.getProcessType(processType.id);

    expect(updatedProcessType.name).toBe(processType.name);

    await processTypeService.deleteProcessType(processType.id);
});

test('Shall not update a processType that does not exists', async function () {
    const processType = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/processTypes/${processType.id}`, 'put', processType);

    expect(response.status).toBe(404);
});

test('Shall delete a processType', async function () {
    const data = { name: generate() };

    const processType = await processTypeService.saveProcessType(data); 

	const response = await request(`http://localhost:3000/api/processTypes/${processType.id}`, 'delete');

    expect(response.status).toBe(204);

    const processTypes = await processTypeService.getProcessTypes();
    expect(processTypes).toHaveLength(0);
});

test('Shall not delete a processType that does not exists', async function () {
    const processType = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/processTypes/${processType.id}`, 'delete');
    expect(response.status).toBe(404);
});