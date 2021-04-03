const axios = require('axios');
const crypto = require('crypto');
const customerService = require('../services/customer.service.js');
const bcrypt = require('bcryptjs');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test.only('Shall get customers', async function () {
    // given - dado que
    const customer1 = await customerService.saveUser(
        { 
            name: generate(), 
            lastName: generate(),
            cep: '05010000',
            state: 'SP',
            city: 'São Paulo',
            street: 'Rua Caiubí',
            neighborhood: 'Perdizes',
            name: generate(), 
            cpf: '09728322976',
            rg: '132740674',
            sex: 'masculino',
            birthDate: new Date(),
            email: 'vmsuzena1@gmail.com', 
            password: generate(),
            landline: generate(),
            cellphone: generate(),
        }
    );
    const customer2 = await customerService.saveUser(
        { 
            name: generate(), 
            lastName: generate(),
            cep: '05010000',
            state: 'SP',
            city: 'São Paulo',
            street: 'Rua Caiubí',
            neighborhood: 'Perdizes',
            name: generate(), 
            cpf: '09728322976',
            rg: '132740674',
            sex: 'masculino',
            birthDate: new Date(),
            email: 'vmsuzena2@gmail.com', 
            password: generate(),
            landline: generate(),
            cellphone: generate(),
        }
    );
    const customer3 = await customerService.saveUser(
        { 
            name: generate(), 
            lastName: generate(),
            cep: '05010000',
            state: 'SP',
            city: 'São Paulo',
            street: 'Rua Caiubí',
            neighborhood: 'Perdizes',
            name: generate(), 
            cpf: '09728322976',
            rg: '132740674',
            sex: 'feminino',
            birthDate: new Date(),
            email: 'vmsuzena3@gmail.com', 
            password: generate(),
            landline: generate(),
            cellphone: generate(),
        }
    );
    // when - quando acontecer
	const response = await request('http://localhost:3000/api/customers', 'get');
    expect(response.status).toBe(200);
	const customers = response.data;
	//then - então
    expect(customers).toHaveLength(3);
    await customerService.deleteCustomer(customer1.id);
    await customerService.deleteCustomer(customer2.id);
    await customerService.deleteCustomer(customer3.id);
});


test('Shall save a user', async function () {
    const data = { name: generate(), username: generate(), email: 'vmsuzena1@gmail.com', password: generate() };
	const response = await request('http://localhost:3000/api/customers', 'post', data);
    expect(response.status).toBe(201);
	const user = response.data;
    expect(user.name).toBe(data.name);
    expect(user.email).toBe(data.email);
    const validatePassword = await bcrypt.compare(data.password, user.password);
    expect(true).toBe(validatePassword);
    await customerService.deleteCustomer(user.id);
});

test('Shall not save a user', async function () {
    const data = { name: generate(), username: generate(), email: 'vmsuzena1@gmail.com', password: generate() };
	const response1 = await request('http://localhost:3000/api/customers', 'post', data);
    const response2 = await request('http://localhost:3000/api/customers', 'post', data);
    expect(response2.status).toBe(409);
	const user = response1.data;
    await customerService.deleteCustomer(user.id);
});

test('Shall not save a user with invalid email', async function () {
    const data = { name: generate(), username: generate(), email: generate(), password: generate() };
	const response = await request('http://localhost:3000/api/customers', 'post', data);
    expect(response.status).toBe(400);
});

test('Shall update a user', async function () {
    const user = await customerService.saveUser({ name: generate(), username: generate(), email: 'vmsuzena1@gmail.com', password: generate() });
    user.name = generate();
    user.email = 'updatede@gmail.com';
    user.password = generate();
	const response = await request(`http://localhost:3000/api/customers/${user.id}`, 'put', user);
    expect(response.status).toBe(204);
    const updatedUser = await customerService.getUser(user.id);
    expect(updatedUser.name).toBe(user.name);
    expect(updatedUser.email).toBe(user.email);
    expect(updatedUser.password).toBe(user.password);
    await customerService.deleteCustomer(user.id);
});

test('Shall not update a user', async function () {
    const user = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/customers/${user.id}`, 'put', user);
    expect(response.status).toBe(404);
});

test('Shall delete a user', async function () {
    const user = await customerService.saveUser({ name: generate(), username: generate(), email: 'vmsuzena1@gmail.com', password: generate() });
	const response = await request(`http://localhost:3000/api/customers/${user.id}`, 'delete');
    expect(response.status).toBe(204);
    const customers = await customerService.getcustomers();
    expect(customers).toHaveLength(0);
});

test('Shall not delete a user', async function () {
    const user = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/customers/${user.id}`, 'delete');
    expect(response.status).toBe(404);
});