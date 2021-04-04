const express = require('express');
const router = express.Router();
const consultationService = require('../services/consultation.service');

router.get('/consultations', async function (req, res, next){
    try {
        const consultations = await consultationService.getConsultations();
        res.json(consultations);
    } catch (error) {
        next(error);
    }
});

router.get('/consultations/:id', async function (req, res, next){
    try {
        const consultations = await consultationService.getConsultation(req.params.id);
        res.json(consultations);
    } catch (error) {
        next(error);
    }
});

router.post('/consultations', async function (req, res, next){
    const consultation = req.body;
    try {
        const newConsultation = await consultationService.saveConsultation(consultation);
        res.status(201).json(newConsultation);
    } catch (error) {
        next(error);
    }
});

router.put('/consultations/:id', async function (req, res, next){
    const consultation = req.body;
    try {
        await consultationService.updateConsultation(req.params.id, consultation)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/consultations/:id', async function (req, res, next){
    try {
        await consultationService.deleteConsultation(req.params.id)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;