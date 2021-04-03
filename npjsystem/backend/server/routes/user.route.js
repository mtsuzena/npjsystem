const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

router.get('/users', async function (req, res, next){
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/users/:id', async function (req, res, next){
    try {
        const users = await userService.getUser(req.params.id);
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.post('/users', async function (req, res, next){
    const user = req.body;
    try {
        const newUser = await userService.saveUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

router.put('/users/:id', async function (req, res, next){
    const user = req.body;
    try {
        await userService.updateUser(req.params.id, user)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/users/:id', async function (req, res, next){
    try {
        await userService.deleteUser(req.params.id)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;