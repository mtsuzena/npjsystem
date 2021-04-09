const axios = require('axios');
const crypto = require('crypto');
const customerService = require('../services/customer.service.js');
const bcrypt = require('bcryptjs');
const cfgs = require('../config/auth.config');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, headers: {'auth-token': cfgs.JWT_USER}, validateStatus: false });
};

test('Shall get customers', async function () {
    // given - dado que
    const customer1 = await customerService.saveCustomer(
        { 
            name: generate(), 
            lastName: generate(),
            cep: '05010000',
            state: 'SP',
            city: 'São Paulo',
            street: 'Rua Caiubí',
            neighborhoodt: 'Perdizes',
            cpf: '197.864.740-90',
            rg: '20.911.256-6',
            sex: 'masculino',
            birthDate: new Date(),
            email: 'vmsuzena1@gmail.com', 
            password: generate(),
            landline: generate(),
            cellphone: generate(),
        }
    );
    const customer2 = await customerService.saveCustomer(
        { 
            name: generate(), 
            lastName: generate(),
            cep: '05010000',
            state: 'SP',
            city: 'São Paulo',
            street: 'Rua Caiubí',
            neighborhoodt: 'Perdizes',
            cpf: '197.864.740-90',
            rg: '20.911.256-6',
            sex: 'masculino',
            birthDate: new Date(),
            landline: generate(),
            cellphone: generate(),
        }
    );
    const customer3 = await customerService.saveCustomer(
        { 
            name: generate(), 
            lastName: generate(),
            cep: '05010000',
            state: 'SP',
            city: 'São Paulo',
            street: 'Rua Caiubí',
            neighborhoodtt: 'Perdizes',
            cpf: '197.864.740-90',
            rg: '20.911.256-6',
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


test('Shall save a customer', async function () {
    const data = { 
        name: generate(), 
        lastName: generate(),
        cep: '05010000',
        state: 'SP',
        city: 'São Paulo',
        street: 'Rua Caiubí',
        neighborhoodt: 'Perdizes',
        cpf: '197.864.740-90',
        rg: '20.911.256-6',
        sex: 'feminino',
        birthDate: new Date(),
        email: 'vmsuzena3@gmail.com', 
        password: generate(),
        landline: generate(),
        cellphone: generate(),
    };

	const response = await request('http://localhost:3000/api/customers', 'post', data);
    expect(response.status).toBe(201);

	const customer = response.data;

    expect(customer.name).toBe(data.name);
    expect(customer.lastName).toBe(data.lastName);
    expect(customer.cep).toBe(data.cep);
    expect(customer.state).toBe(data.state);
    expect(customer.city).toBe(data.city);
    expect(customer.street).toBe(data.street);
    expect(customer.neighborhoodtt).toBe(data.neighborhoodtt);
    expect(customer.cpf).toBe(data.cpf);
    expect(customer.rg).toBe(data.rg);
    expect(customer.sex).toBe(data.sex);
    // expect(customer.birthDate).toBe(data.birthDate);
    expect(customer.email).toBe(data.email);
    expect(customer.landline).toBe(data.landline);
    expect(customer.cellphone).toBe(data.cellphone);
    const validatePassword = await bcrypt.compare(data.password, customer.password);
    expect(true).toBe(validatePassword);

    await customerService.deleteCustomer(customer.id);
});

test('Shall not save a customer duplicated', async function () {
    const data = { 
        name: generate(), 
        lastName: generate(),
        cep: '05010000',
        state: 'SP',
        city: 'São Paulo',
        street: 'Rua Caiubí',
        neighborhoodt: 'Perdizes',
        cpf: '197.864.740-90',
        rg: '20.911.256-6',
        sex: 'feminino',
        birthDate: new Date(),
        email: 'vmsuzena3@gmail.com', 
        password: generate(),
        landline: generate(),
        cellphone: generate(),
    };

	const response1 = await request('http://localhost:3000/api/customers', 'post', data);
    const response2 = await request('http://localhost:3000/api/customers', 'post', data);

    expect(response2.status).toBe(409);

	const customer = response1.data;
    await customerService.deleteCustomer(customer.id);
});

test('Shall not save a customer with invalid email', async function () {
    const data = { 
        name: generate(), 
        lastName: generate(),
        cep: '05010000',
        state: 'SP',
        city: 'São Paulo',
        street: 'Rua Caiubí',
        neighborhoodt: 'Perdizes',
        cpf: '197.864.740-90',
        rg: '20.911.256-6',
        sex: 'feminino',
        birthDate: new Date(),
        email: generate(),
        landline: generate(),
        cellphone: generate(),
    };

	const response = await request('http://localhost:3000/api/customers', 'post', data);
    expect(response.status).toBe(400);
});

test('Shall update a customer', async function () {

    const data = { 
        name: generate(), 
        lastName: generate(),
        cep: '05010000',
        state: 'SP',
        city: 'São Paulo',
        street: 'Rua Caiubí',
        neighborhoodt: 'Perdizes',
        cpf: '197.864.740-90',
        rg: '20.911.256-6',
        sex: 'feminino',
        birthDate: new Date(),
        email: 'vmsuzena3@gmail.com', 
        password: generate(),
        landline: generate(),
        cellphone: generate(),
    };

    const customer = await customerService.saveCustomer(data); 

    customer.name = generate();
    customer.lastName = generate();
    customer.cep = '60347600'
    customer.state = 'CE'
    customer.city = 'Fortaleza';
    customer.street = 'Rua 3';
    customer.cpf = '262.670.970-05';
    customer.rg = '28.339.008-6';
    customer.sex = 'masculino';
    customer.email = 'updated@gmail.com';
    customer.landline = '123123123';
    customer.cellphone = '333331313';

	const response = await request(`http://localhost:3000/api/customers/${customer.id}`, 'put', customer);

    expect(response.status).toBe(204);

    const updatedCustomerGet = await request(`http://localhost:3000/api/customers/${customer.id}`, 'get');

    const updatedCustomer = updatedCustomerGet.data;

    expect(updatedCustomer.name).toBe(customer.name);
    expect(updatedCustomer.lastName).toBe(customer.lastName);
    expect(updatedCustomer.cep).toBe(customer.cep);
    expect(updatedCustomer.state).toBe(customer.state);
    expect(updatedCustomer.city).toBe(customer.city);
    expect(updatedCustomer.street).toBe(customer.street);
    expect(updatedCustomer.cpf).toBe(customer.cpf);
    expect(updatedCustomer.rg).toBe(customer.rg);
    expect(updatedCustomer.sex).toBe(customer.sex);
    expect(updatedCustomer.email).toBe(customer.email);
    expect(updatedCustomer.landline).toBe(customer.landline);
    expect(updatedCustomer.cellphone).toBe(customer.cellphone);

    await customerService.deleteCustomer(customer.id);
});

test('Shall not update a customer that does not exists', async function () {
    const customer = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/customers/${customer.id}`, 'put', customer);

    expect(response.status).toBe(404);
});

test('Shall not update a customer that does not have valid email', async function () {

    const data = { 
        name: generate(), 
        lastName: generate(),
        cep: '05010000',
        state: 'SP',
        city: 'São Paulo',
        street: 'Rua Caiubí',
        neighborhoodt: 'Perdizes',
        cpf: '197.864.740-90',
        rg: '20.911.256-6',
        sex: 'feminino',
        birthDate: new Date(),
        email: 'vmsuzena3@gmail.com', 
        password: generate(),
        landline: generate(),
        cellphone: generate(),
    };

    const customer = await customerService.saveCustomer(data); 

    customer.email = generate();

	const response = await request(`http://localhost:3000/api/customers/${customer.id}`, 'put', customer);

    expect(response.status).toBe(400);

    await customerService.deleteCustomer(customer.id);
});

test('Shall delete a customer', async function () {
    const data = { 
        name: generate(), 
        lastName: generate(),
        cep: '05010000',
        state: 'SP',
        city: 'São Paulo',
        street: 'Rua Caiubí',
        neighborhoodt: 'Perdizes',
        cpf: '197.864.740-90',
        rg: '20.911.256-6',
        sex: 'feminino',
        birthDate: new Date(),
        email: 'vmsuzena3@gmail.com', 
        password: generate(),
        landline: generate(),
        cellphone: generate(),
    };

    const customer = await customerService.saveCustomer(data); 

	const response = await request(`http://localhost:3000/api/customers/${customer.id}`, 'delete');

    expect(response.status).toBe(204);

    const customers = await customerService.getCustomers();
    expect(customers).toHaveLength(0);
});

test('Shall not delete a customer that does not exists', async function () {
    const customer = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/customers/${customer.id}`, 'delete');
    expect(response.status).toBe(404);
});