const express = require('express');
const router = express.Router();
const processChecklistService = require('../services/processChecklist.service');
const verify = require('../helpers/verifyToken');
const processMovementService = require('../services/processMovement.service');

router.get('/processChecklists', verify, async function (req, res, next){
    try {
        const processChecklists = await processChecklistService.getProcessChecklists();
        res.json(processChecklists);
    } catch (error) {
        next(error);
    }
});

router.get('/processChecklists/:id', verify, async function (req, res, next){
    try {
        const processChecklist = await processChecklistService.getProcessChecklist(req.params.id);
        res.json(processChecklist);
    } catch (error) {
        next(error);
    }
});

router.post('/processChecklists', verify, async function (req, res, next){
    const processChecklist = req.body;
    try {
        const newProcessChecklist = await processChecklistService.saveProcessChecklist(processChecklist);
        
        // gera log criacao checklist
        const token = req.header('auth-token');
        await processMovementService.gerarMovimentacaoDeCriacaoDeChecklist(token, newProcessChecklist);

        res.status(201).json(newProcessChecklist);
    } catch (error) {
        next(error);
    }
});

router.put('/processChecklists/:id', verify, async function (req, res, next){
    const processChecklist = req.body;
    try {
        await processChecklistService.updateProcessChecklist(req.params.id, processChecklist);

        // gera log criacao checklist
        if(processChecklist.status){
            const token = req.header('auth-token');
            await processMovementService.gerarLogMovimentacaoChecklist(token, processChecklist);   
        }

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/processChecklists/:id', verify, async function (req, res, next){
    try {
        await processChecklistService.deleteProcessChecklist(req.params.id)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;