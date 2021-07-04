const express = require('express');
const router = express.Router();
const testemunhaAudienciaService = require('../services/testemunhaAudiencia.service');
const verify = require('../helpers/verifyToken');

router.get('/audiencias/testemunhas/byAudienciaId/:audienciaId', verify, async function (req, res, next){
    try {
        const testemunhasAudiencia = await testemunhaAudienciaService.getTestemunhasAudienciaByAudienciaId(req.params.audienciaId);
        res.json(testemunhasAudiencia);
    } catch (error) {
        next(error);
    }
});

router.post('/audiencias/testemunhas', verify, async function (req, res, next){
    const testemunhaAudiencia = req.body;
    try {
        const newTestemunhaAudiencia = await testemunhaAudienciaService.saveTestemunhaAudiencia(testemunhaAudiencia);
        res.status(201).json(newTestemunhaAudiencia);
    } catch (error) {
        next(error);
    }
});

module.exports = router;