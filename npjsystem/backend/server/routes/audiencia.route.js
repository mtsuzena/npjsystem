const express = require('express');
const router = express.Router();
const audienciaService = require('../services/audiencia.service');
const verify = require('../helpers/verifyToken');

router.get('/audiencias', verify, async function (req, res, next){
    try {
        const audiencias = await audienciaService.getAudiencias();
        res.json(audiencias);
    } catch (error) {
        next(error);
    }
});

router.get('/audiencias/byProcessId/:processId', verify, async function (req, res, next){
    try {
        const audiencias = await audienciaService.getAudienciaByProcessId(req.params.processId);
        res.json(audiencias);
    } catch (error) {
        next(error);
    }
});

router.get('/audiencias/:id', verify, async function (req, res, next){
    try {
        const audiencia = await audienciaService.getAudiencia(req.params.id);
        res.json(audiencia);
    } catch (error) {
        next(error);
    }
});


router.post('/audiencias', verify, async function (req, res, next){
    const audiencia = req.body;
    try {
        const newAudiencia = await audienciaService.saveAudiencia(audiencia);
        res.status(201).json(newAudiencia);
    } catch (error) {
        next(error);
    }
});

module.exports = router;