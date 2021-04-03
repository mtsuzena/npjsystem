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
    const customer2 = await customerService.saveCustomer(
        { 
            name: generate(), 
            lastName: generate(),
            cep: '05010000',
            state: 'SP',
            city: 'São Paulo',
            street: 'Rua Caiubí',
            neighborhoodt: 'Perdizes',
            name: generate(), 
            cpf: '09728322976',
            rg: '132740674',
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


test('Shall save a customer', async function () {
    const data = { 
        name: generate(), 
        lastName: generate(),
        cep: '05010000',
        state: 'SP',
        city: 'São Paulo',
        street: 'Rua Caiubí',
        neighborhoodt: 'Perdizes',
        name: generate(), 
        cpf: '09728322976',
        rg: '132740674',
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