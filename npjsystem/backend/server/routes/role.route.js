const e = require('express');
const express = require('express');
const router = express.Router();
const roleService = require('../services/role.service');

router.get('/roles', async function (req, res, next){
    try {
        const roles = await roleService.getRoles();
        res.json(roles);
    } catch (error) {
        next(error);
    }
});

router.post('/roles', async function (req, res, next){
    const role = req.body;
    try {
        const newRole = await roleService.saveRole(role)
        res.status(201).json(newRole);
    } catch (error) {
        next(error);
    }
});

router.put('/roles/:id', async function (req, res, next){
    
});

module.exports = router;