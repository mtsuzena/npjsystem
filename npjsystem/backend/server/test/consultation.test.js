const axios = require('axios');
const crypto = require('crypto');
const consultationService = require('../services/consultation.service.js');
const customerService = require('../services/customer.service.js');
const userService = require('../services/user.service.js');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Shall get consultations', async function () {
    // given - dado que
    const customer = await customerService.saveCustomer(
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

    const user = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate()});

    const consultation1 = await consultationService.saveConsultation({userId: user.id, customerId: customer.id, consultationDate: new Date()});
    const consultation2 = await consultationService.saveConsultation({userId: user.id, customerId: customer.id, consultationDate: new Date()});
    const consultation3 = await consultationService.saveConsultation({userId: user.id, customerId: customer.id, consultationDate: new Date()});

    // when - quando acontecer
	const response = await request('http://localhost:3000/api/consultations', 'get');

    expect(response.status).toBe(200);
    
	const consultations = response.data;
	//then - então
    expect(consultations).toHaveLength(3);
    
    await consultationService.deleteConsultation(consultation1.id);
    await consultationService.deleteConsultation(consultation2.id);
    await consultationService.deleteConsultation(consultation3.id);
    await userService.deleteUser(user.id);
    await customerService.deleteCustomer(customer.id);
});


test('Shall save a consultation', async function () {
    // given - dado que
    const customer = await customerService.saveCustomer(
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

    const user = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate()});
    
    data = {userId: user.id, customerId: customer.id, consultationDate: "2021-04-04T14:01:30.000Z"}

	const response = await request('http://localhost:3000/api/consultations', 'post', data);
    expect(response.status).toBe(201);

    const consultation = response.data;

    expect(consultation.userId).toBe(data.userId);
    expect(consultation.customerId).toBe(data.customerId);
    expect(consultation.consultationDate).toBe(data.consultationDate);


    await consultationService.deleteConsultation(consultation.id);
    await userService.deleteUser(user.id);
    await customerService.deleteCustomer(customer.id);
});

test('Shall not save a consultation with a date when the user is already committed', async function () {
    const customer = await customerService.saveCustomer(
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

    const user = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate()});
    
    data = {userId: user.id, customerId: customer.id, consultationDate: "2021-04-04T14:01:30.000Z"}

	const response1 = await request('http://localhost:3000/api/consultations', 'post', data);
    const response2 = await request('http://localhost:3000/api/consultations', 'post', data);

    expect(response2.status).toBe(409);

	const consultation = response1.data;
    await consultationService.deleteConsultation(consultation.id);
    await userService.deleteUser(user.id);
    await customerService.deleteCustomer(customer.id);
});

test('Shall not save a consultation with inexisting user', async function () {
    const customer = await customerService.saveCustomer(
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

    const user = {
        id: 1
    }
    
    data = {userId: user.id, customerId: customer.id, consultationDate: "2021-04-04T14:01:30.000Z"}

	const response = await request('http://localhost:3000/api/consultations', 'post', data);
    expect(response.status).toBe(404);

    await customerService.deleteCustomer(customer.id);
});

test('Shall not save a consultation with inexisting customer', async function () {
    const user = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate()});

    const customer = {
        id: 1
    }
    
    data = {userId: user.id, customerId: customer.id, consultationDate: "2021-04-04T14:01:30.000Z"}

	const response = await request('http://localhost:3000/api/consultations', 'post', data);
    expect(response.status).toBe(404);

    await userService.deleteUser(user.id);
});

test('Shall update a consultation', async function () {

    const customer = await customerService.saveCustomer(
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
            email: 'customer1@gmail.com', 
            password: generate(),
            landline: generate(),
            cellphone: generate(),
        }
    );

    const user = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate()});

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
            email: 'customerr2@gmmail.com', 
            password: generate(),
            landline: generate(),
            cellphone: generate(),
        }
    );

    const user2 = await userService.saveUser({ name: generate(), lastName: generate(), email: 'user2@gmail.com', password: generate()});

    const consultation = await consultationService.saveConsultation({userId: user.id, customerId: customer.id, consultationDate: "2021-04-04T14:01:30.000Z"});

    consultation.userId = user2.id;
    consultation.customerId = customer2.id;;
    consultation.consultationDate = "2021-08-04T14:01:30.000Z";

	const response = await request(`http://localhost:3000/api/consultations/${consultation.id}`, 'put', consultation);

    expect(response.status).toBe(204);

    const updatedConsultation = await consultationService.getConsultation(consultation.id)

    console.log(updatedConsultation.consultationDate);

    expect(updatedConsultation.userId).toBe(consultation.userId);
    expect(updatedConsultation.customerId).toBe(consultation.customerId);
    expect(updatedConsultation.consultationDate).toStrictEqual(consultation.consultationDate);


    await consultationService.deleteConsultation(consultation.id);
    await userService.deleteUser(user.id);
    await customerService.deleteCustomer(customer.id);
    await userService.deleteUser(user2.id);
    await customerService.deleteCustomer(customer2.id);
});

test('Shall not update a consultation that does not exists', async function () {
    const consultation = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/consultations/${consultation.id}`, 'put', consultation);

    expect(response.status).toBe(404);
});


test('Shall delete a consultation', async function () {
    const customer = await customerService.saveCustomer(
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
            email: 'customer1@gmail.com', 
            password: generate(),
            landline: generate(),
            cellphone: generate(),
        }
    );

    const user = await userService.saveUser({ name: generate(), lastName: generate(), email: 'vmsuzena1@gmail.com', password: generate()});

    const consultation = await consultationService.saveConsultation({userId: user.id, customerId: customer.id, consultationDate: "2021-04-04T14:01:30.000Z"});

	const response = await request(`http://localhost:3000/api/consultations/${consultation.id}`, 'delete');

    expect(response.status).toBe(204);

    const consultations = await consultationService.getConsultations();
    expect(consultations).toHaveLength(0);
    
    await userService.deleteUser(user.id);
    await customerService.deleteCustomer(customer.id);
});

test('Shall not delete a customer that does not exists', async function () {
    const consultation = {
        id: 1
    };
	const response = await request(`http://localhost:3000/api/consultations/${consultation.id}`, 'delete');
    expect(response.status).toBe(404);
});