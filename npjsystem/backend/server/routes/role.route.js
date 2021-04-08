const e = require('express');
const express = require('express');
const router = express.Router();
const roleService = require('../services/role.service');
const verify = require('../helpers/verifyToken');

router.get('/roles', verify, async function (req, res, next){
    try {
        const roles = await roleService.getRoles();
        res.json(roles);
    } catch (error) {
        next(error);
    }
});

router.get('/roles/:id', verify, async function (req, res, next){
    try {
        const roles = await roleService.getRole(req.params.id);
        res.json(roles);
    } catch (error) {
        next(error);
    }
});

router.post('/roles', verify, async function (req, res, next){
    const role = req.body;
    try {
        const newRole = await roleService.saveRole(role)
        res.status(201).json(newRole);
    } catch (error) {
        next(error);
    }
});

router.put('/roles/:id', verify, async function (req, res, next){
    const role = req.body;
    try {
        await roleService.updateRole(req.params.id, role)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/roles/:id', verify, async function (req, res, next){
    try {
        await roleService.deleteRole(req.params.id)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});


module.exports = router;