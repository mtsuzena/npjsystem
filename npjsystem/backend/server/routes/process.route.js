const express = require('express');
const router = express.Router();
const processService = require('../services/process.service');
const verify = require('../helpers/verifyToken');

router.get('/processes', verify, async function (req, res, next){
    try {
        const processes = await processService.getProcesses();
        res.json(processes);
    } catch (error) {
        next(error);
    }
});

router.get('/processes/:id', verify, async function (req, res, next){
    try {
        const process = await processService.getProcess(req.params.id);
        res.json(process);
    } catch (error) {
        next(error);
    }
});

router.get('/processes/byUserId/:userId', verify, async function (req, res, next){
    try {
        const processes = await processService.getProcessesByUserId(req.params.userId);
        res.json(processes);
    } catch (error) {
        next(error);
    }
});

router.get('/processes/byProcessNumber/:processNumber', verify, async function (req, res, next){
    try {
        const process = await processService.getProcessByProcessNumber(req.params.processNumber);
        res.json(process);
    } catch (error) {
        next(error);
    }
});

router.post('/processes', verify, async function (req, res, next){
    const process = req.body;
    try {
        const newProcess = await processService.saveProcess(process);
        res.status(201).json(newProcess);
    } catch (error) {
        next(error);
    }
});

router.put('/processes/:id', verify, async function (req, res, next){
    const process = req.body;
    try {
        await processService.updateProcess(req.params.id, process)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/processes/:id', verify, async function (req, res, next){
    try {
        await processService.deleteProcess(req.params.id)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;