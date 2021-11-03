const e = require('express');
const express = require('express');
const router = express.Router();
const profileService = require('../services/profile.service');
const verify = require('../helpers/verifyToken');

router.get('/profiles', verify, async function (req, res, next){
    try {
        const profiles = await profileService.getProfiles();
        res.json(profiles);
    } catch (error) {
        next(error);
    }
});

router.get('/profiles/:id', verify, async function (req, res, next){
    try {
        const profiles = await profileService.getProfile(req.params.id);
        res.json(profiles);
    } catch (error) {
        next(error);
    }
});

router.post('/profiles', verify, async function (req, res, next){
    const profile = req.body;
    try {
        const newProfile = await profileService.saveProfile(profile)
        res.status(201).json(newProfile);
    } catch (error) {
        next(error);
    }
});

router.put('/profiles/:id', verify, async function (req, res, next){
    const profile = req.body;
    try {
        const profileUpdated = await profileService.updateProfile(req.params.id, profile)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/profiles/:id', verify, async function (req, res, next){
    try {
        await profileService.deleteProfile(req.params.id)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});


module.exports = router;