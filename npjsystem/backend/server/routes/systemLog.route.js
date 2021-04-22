const express = require('express');
const router = express.Router();
const systemLogService = require('../services/systemLog.service');
const verify = require('../helpers/verifyToken');

router.get('/systemLogs', verify, async function (req, res, next){
    try {
        const systemLogs = await systemLogService.getSystemLogs();
        res.json(systemLogs);
    } catch (error) {
        next(error);
    }
});

router.get('/systemLogs/:logId', verify, async function (req, res, next){
    try {
        const systemLog = await systemLogService.getSystemLog(req.params.logId);
        res.json(systemLog);
    } catch (error) {
        next(error);
    }
});

router.get('/systemLogs/byUserId/:userId', verify, async function (req, res, next){
    try {
        const systemLog = await systemLogService.getSystemLogByUserId(req.params.userId);
        res.json(systemLog);
    } catch (error) {
        next(error);
    }
});

router.post('/systemLogs', verify, async function (req, res, next){
    const systemLog = req.body;
    try {
        const newSystemLogs = await systemLogService.saveSystemLog(systemLog);
        res.status(201).json(newSystemLogs);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;