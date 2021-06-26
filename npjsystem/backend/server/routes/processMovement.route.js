const express = require('express');
const router = express.Router();
const processMovementService = require('../services/processMovement.service');
const verify = require('../helpers/verifyToken');


router.get('/processMovements/:processId', verify, async function (req, res, next){
    try {
        const processMovements = await processMovementService.getProcessMovementsByProcessId(req.params.processId);
        res.json(processMovements);
    } catch (error) {
        next(error);
    }
});

router.post('/processMovements', verify, async function (req, res, next){
    const processMovement = req.body;
    try {
        const newProcessMovement = await processMovementService.saveProcessMovement(processMovement);
        res.status(201).json(newProcessMovement);
    } catch (error) {
        next(error);
    }
});

module.exports = router;