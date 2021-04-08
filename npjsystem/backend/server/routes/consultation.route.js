const express = require('express');
const router = express.Router();
const consultationService = require('../services/consultation.service');
const verify = require('../helpers/verifyToken');

router.get('/consultations', verify, async function (req, res, next){
    try {
        const consultations = await consultationService.getConsultations();
        res.json(consultations);
    } catch (error) {
        next(error);
    }
});

router.get('/consultations/:id', verify, async function (req, res, next){
    try {
        const consultations = await consultationService.getConsultation(req.params.id);
        res.json(consultations);
    } catch (error) {
        next(error);
    }
});

router.post('/consultations', verify, async function (req, res, next){
    const consultation = req.body;
    try {
        const newConsultation = await consultationService.saveConsultation(consultation);
        res.status(201).json(newConsultation);
    } catch (error) {
        next(error);
    }
});

router.put('/consultations/:id', verify, async function (req, res, next){
    const consultation = req.body;
    try {
        await consultationService.updateConsultation(req.params.id, consultation)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/consultations/:id', verify, async function (req, res, next){
    try {
        await consultationService.deleteConsultation(req.params.id)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;