const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const verify = require('../helpers/verifyToken');
const systemLogService = require('../services/systemLog.service');

router.get('/users', verify, async function (req, res, next){
    try {
        const users = await userService.getUsers();

        const userLog = await userService.getUser(req.user.id);
        systemLogService.saveSystemLog({
            action: "CONSULTA",
            description: "Usuário " + userLog.name + " " + "(id: " + userLog.id + ", email: " + userLog.email + ") realizou uma consulta de usuários",
            userId: userLog.id
        });

        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/users/:id', verify, async function (req, res, next){
    try {
        const user = await userService.getUser(req.params.id);

        const userLog = await userService.getUser(req.user.id);
        systemLogService.saveSystemLog({
            action: "CONSULTA",
            description: "Usuário " + userLog.name + " " 
            + "(id: " + userLog.id + ", email: " + userLog.email 
            + ") realizou uma consulta do usuário " + user.name 
            + " (id: " + user.id + ", email: " + user.email + ")",
            userId: userLog.id
        });
        
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.post('/users', verify, async function (req, res, next){
    const user = req.body;
    try {
        const newUser = await userService.saveUser(user);

        const userLog = await userService.getUser(req.user.id);
        systemLogService.saveSystemLog({
            action: "CRIAÇÃO",
            description: "Usuário " + userLog.name + " " 
            + "(id: " + userLog.id + ", email: " + userLog.email 
            + ") realizou um cadastro do usuário " + newUser.name 
            + " (id: " + newUser.id + ", email: " + newUser.email + ")",
            userId: userLog.id
        });
        
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

router.put('/users/:id', verify, async function (req, res, next){
    const user = req.body;
    try {
        await userService.updateUser(req.params.id, user);

        const userLog = await userService.getUser(req.user.id);
        systemLogService.saveSystemLog({
            action: "EDIÇÃO",
            description: "Usuário " + userLog.name + " " 
            + "(id: " + userLog.id + ", email: " + userLog.email 
            + ") realizou uma edição de usuário",
            userId: userLog.id
        });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/users/:id', verify, async function (req, res, next){
    try {
        await userService.deleteUser(req.params.id);

        const userLog = await userService.getUser(req.user.id);
        systemLogService.saveSystemLog({
            action: "EXCLUSÃO",
            description: "Usuário " + userLog.name + " " 
            + "(id: " + userLog.id + ", email: " + userLog.email 
            + ") deletou um usuário",
            userId: userLog.id
        });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;