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

module.exports = router;