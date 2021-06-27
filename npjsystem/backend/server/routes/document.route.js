const express = require('express');
const router = express.Router();
const documentService = require('../services/document.service');
const verify = require('../helpers/verifyToken');

router.post('/documents', verify, async function (req, res, next){
    const document = req.body;
    try {
        const newDocument = await documentService.saveDocument(document);
        res.status(201).json(newDocument);
    } catch (error) {
        next(error);
    }
});

router.put('/documents/:id', verify, async function (req, res, next){
    const document = req.body;
    try {
        await documentService.updateDocument(req.params.id, document)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;