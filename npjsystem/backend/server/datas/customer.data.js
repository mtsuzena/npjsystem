const db = require("../models");
const Customer = db.customer;

exports.getCustomers = function () {
    return Customer.findAll();
};

exports.getCustomer = function (id) {
    return Customer.findByPk(id);
};

exports.getCustomerByEmail = function (email) {
    return Customer.findOne({
        where: {
            email: email
        }
    });
};

exports.saveCustomer = function (customer) {
	return Customer.create(customer);
};

exports.deleteCustomer = function (id) {
	return Customer.destroy({
        where: {
            id: id
        }
    })
};

exports.updateCustomer = function (customer) {
    customer.save();
};