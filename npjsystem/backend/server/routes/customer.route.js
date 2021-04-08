const express = require('express');
const router = express.Router();
const customerService = require('../services/customer.service');
const verify = require('../helpers/verifyToken');

router.get('/customers', verify, async function (req, res, next){
    try {
        const customers = await customerService.getCustomers();
        res.json(customers);
    } catch (error) {
        next(error);
    }
});

router.get('/customers/:id', verify, async function (req, res, next){
    try {
        const customers = await customerService.getCustomer(req.params.id);
        res.json(customers);
    } catch (error) {
        next(error);
    }
});

router.post('/customers', verify, async function (req, res, next){
    const customer = req.body;
    try {
        const newCustomer = await customerService.saveCustomer(customer);
        res.status(201).json(newCustomer);
    } catch (error) {
        next(error);
    }
});

router.put('/customers/:id', verify, async function (req, res, next){
    const customer = req.body;
    try {
        await customerService.updateCustomer(req.params.id, customer)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/customers/:id', verify, async function (req, res, next){
    try {
        await customerService.deleteCustomer(req.params.id)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;