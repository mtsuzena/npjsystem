const documentData = require('../datas/document.data');
const processChecklistService = require('../services/processChecklist.service');

exports.saveDocument = async function (document) {
    const existingProcessChecklist = await processChecklistService.getProcessChecklist(document.processChecklistId);
    if (!existingProcessChecklist) throw new Error('ProcessChecklist not found');
    
    return documentData.saveDocument(document);
}

exports.updateDocument = async function (id, document) {

    const existingDocument = await documentData.getDocument(id);
    if (!existingDocument) throw new Error('Document not found');

    if(document.fileName){
        existingDocument.fileName = document.fileName;
    }

    return documentData.updateDocument(existingDocument);
}
