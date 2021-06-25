const processMovementData = require('../datas/processMovement.data');
const processService = require('./process.service');
const usersData = require('../datas/user.data.js');

exports.getProcessMovementsByProcessId = async function (processId) {
    return processMovementData.getProcessMovementsByProcessId(processId);
}

exports.saveProcessMovement = async function (processMovement) {
    if(!processMovement.processId) throw new Error('processMovement shall have a ProcessId');
    if(!processMovement.userId) throw new Error('processMovement shall have a UserId');
    if(!processMovement.actionName) throw new Error('processMovement shall have a actionName');
    if(!processMovement.actionDescription) throw new Error('processMovement shall have a actionDescription');
    
    const existingProcess = await processService.getProcess(processMovement.processId);
    if (!existingProcess) throw new Error('Process not found');

    const existingUser = await usersData.getUser(id);
    if (!existingUser) throw new Error('User not found');

    return processMovementData.saveProcessMovement(processMovement);
}