const express = require('express');
const router = express.Router();
const documentService = require('../services/document.service');
const verify = require('../helpers/verifyToken');
const multer = require('multer');
const multerConfig = require('../config/multer');

router.post('/documents', verify, async function (req, res, next){
    const document = req.body;
    try {
        const newDocument = await documentService.saveDocument(document);
        res.status(201).json(newDocument);
    } catch (error) {
        next(error);
    }
});

router.post('/documents/upload', verify, multer(multerConfig).single('file'), async function (req, res, next){
    res.status(201).json({"fileName": `${req.file.filename}`, "message": "Documento salvo com sucesso."});
});

router.get('/documents/download/:fileName', verify, async function (req, res, next){
    try {
        const fileName = req.params.fileName;
        const path = require('path');
        const filePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');
        res.download(filePath + '\\' + fileName);
    } catch (error) {
        throw new Error('No such file');
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