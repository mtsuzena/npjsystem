const customerData = require('../datas/customer.data.js');
const bcrypt = require('bcryptjs');
const validator = require('email-validator');

exports.getCustomers = function () {
    return customerData.getCustomers();
}

exports.getCustomer = async function (id) {
    const existingCustomer = await customerData.getCustomer(id);
    if (!existingCustomer) throw new Error('Customer not found');
    
    return existingCustomer;
}

exports.getCustomerByEmail = async function(email){
    const existingCustomer = await customerData.getCustomerByEmail(email);
    if (!existingCustomer) throw new Error('Customer not found');

    return existingCustomer;
}

exports.saveCustomer = async function (customer) {

    if(customer.email){
        isEmailValid = validator.validate(customer.email);
        if (!isEmailValid) throw new Error('Email invalid');

        const existingEmail = await customerData.getCustomerByEmail(customer.email);
        if (existingEmail) throw new Error('Email already exists');
    }

    if(customer.password){
        //encriptar password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(customer.password, salt);

        customer.password = hashedPassword
    }

    return customerData.saveCustomer(customer);
}

exports.deleteCustomer = async function (id) {
    const existingCustomer = await customerData.getCustomer(id);
    if (!existingCustomer) throw new Error('Customer not found');

    return customerData.deleteCustomer(id);
}

exports.updateCustomer = async function (id, customer) {
    const existingCustomer = await customerData.getCustomer(id);
    if (!existingCustomer) throw new Error('Customer not found');

    existingCustomer.name = customer.name;
    existingCustomer.lastName = customer.lastName;
    existingCustomer.cep = customer.cep;
    existingCustomer.state = customer.state;
    existingCustomer.city = customer.city;
    existingCustomer.street = customer.street;
    existingCustomer.neighborhoodt = customer.neighborhoodt;
    existingCustomer.cpf = customer.cpf;
    existingCustomer.rg = customer.rg;
    existingCustomer.sex = customer.sex;
    existingCustomer.birthDate = customer.birthDate;
    existingCustomer.landline = customer.landline;
    existingCustomer.cellphone = customer.cellphone;
    existingCustomer.customerActive = customer.customerActive;
    
    if(customer.email){
        isEmailValid = validator.validate(customer.email);
        if (!isEmailValid) throw new Error('Email invalid');
        existingCustomer.email = customer.email;
    }

    if(customer.password){
        //encriptar password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(customer.password, salt);

        existingCustomer.password = hashedPassword;
    }

    return customerData.updateCustomer(existingCustomer);
}
