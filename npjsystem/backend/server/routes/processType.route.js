const express = require('express');
const router = express.Router();
const processTypeService = require('../services/processType.service');

router.get('/processTypes', async function (req, res, next){
    try {
        const processTypes = await processTypeService.getProcessTypes();
        res.json(processTypes);
    } catch (error) {
        next(error);
    }
});

router.get('/processTypes/:id', async function (req, res, next){
    try {
        const processType = await processTypeService.getProcessType(req.params.id);
        res.json(processType);
    } catch (error) {
        next(error);
    }
});

router.post('/processTypes', async function (req, res, next){
    const processType = req.body;
    try {
        const newProcessType = await processTypeService.saveProcessType(processType);
        res.status(201).json(newProcessType);
    } catch (error) {
        next(error);
    }
});

router.put('/processTypes/:id', async function (req, res, next){
    const processType = req.body;
    try {
        await processTypeService.updateProcessType(req.params.id, processType)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/processTypes/:id', async function (req, res, next){
    try {
        await processTypeService.deleteProcessType(req.params.id)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;