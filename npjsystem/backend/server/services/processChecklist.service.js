const processChecklistData = require('../datas/processChecklist.data');
const processService = require('./process.service');

exports.getProcessChecklists = function () {
    return processChecklistData.getProcessChecklists();
}

exports.getProcessChecklist = async function (id) {
    return processChecklistData.getProcessChecklist(id);
}

exports.saveProcessChecklist = async function (processChecklist) {
    if(!processChecklist.processId) throw new Error('ProcessChecklist shall have a Process');
    if(!processChecklist.name) throw new Error('ProcessChecklist shall have a Name');
    
    const existingProcess = await processService.getProcess(processChecklist.processId);
    if (!existingProcess) throw new Error('Process not found');

    return processChecklistData.saveProcessChecklist(processChecklist);
}

exports.deleteProcessChecklist = async function (id) {
    const existingProcessChecklist = await processChecklistData.getProcessChecklist(id);
    if (!existingProcessChecklist) throw new Error('ProcessChecklist not found');

    return processChecklistData.deleteProcessChecklist(id);
}

exports.updateProcessChecklist = async function (id, processChecklist) {
    if(!processChecklist.processId) throw new Error('ProcessChecklist shall have a Process');
    if(!processChecklist.name) throw new Error('ProcessChecklist shall have a Name');

    const existingProcessChecklist = await processChecklistData.getProcessChecklist(id);
    if (!existingProcessChecklist) throw new Error('ProcessChecklist not found');

    const existingProcess = await processService.getProcess(processChecklist.processId);
    if (!existingProcess) throw new Error('Process not found');

    if (processChecklist.status){
        existingProcessChecklist.status = processChecklist.status;
    }

    existingProcessChecklist.name = processChecklist.name;
    existingProcessChecklist.isChecked = processChecklist.isChecked;
    existingProcessChecklist.deadline = processChecklist.deadline;
    existingProcessChecklist.processId = processChecklist.processId;

    return processChecklistData.updateProcessChecklist(existingProcessChecklist);
}
