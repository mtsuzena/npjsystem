const processMovementData = require('../datas/processMovement.data');
const processService = require('./process.service');
const usersData = require('../datas/user.data.js');
const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

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

    const existingUser = await usersData.getUser(processMovement.userId);
    if (!existingUser) throw new Error('User not found');

    return processMovementData.saveProcessMovement(processMovement);
}

exports.gerarMovimentacaoDeCriacaoDeProcesso  = async function (token, newProcess) {
    const userDecoded = jwt.verify(token, authConfig.TOKEN_SECRET);
    const user = await userService.getUser(userDecoded.id);

    let data = new Date();
    var dia = data.getDate(); 
    var mes = data.getMonth();
    var ano = data.getFullYear(); 
    var hora = data.getHours();
    var min = data.getMinutes();
    var seg = data.getSeconds();

    let actionName = "Criação de Processo";
    let actionDescription = 
        'Usuário ' 
        + user.name 
        + ' ' 
        + user.lastName
        + ' iniciou o processo '
        + newProcess.number
        + ' no dia'
        + ' ' + dia + '/' + (mes+1) + '/' + ano
        + ' às '
        + hora + ':' + min + ':' + seg + '.';

    processMovement = {
        actionName: actionName, 
        actionDescription: actionDescription,
        processId: newProcess.id,
        userId: user.id
    };

    processMovementData.saveProcessMovement(processMovement);
}

exports.gerarMovimentacaoDeCriacaoDeChecklist = async function (token, newChecklist) {
    const userDecoded = jwt.verify(token, authConfig.TOKEN_SECRET);
    const user = await userService.getUser(userDecoded.id);

    let data = new Date();
    var dia = data.getDate(); 
    var mes = data.getMonth();
    var ano = data.getFullYear(); 
    var hora = data.getHours();
    var min = data.getMinutes();
    var seg = data.getSeconds();

    let actionName = "Crição de Checklist";
    let actionDescription = 
        'Usuário ' 
        + user.name 
        + ' ' 
        + user.lastName
        + ' criou o checklist '
        + newChecklist.name
        + ' no dia'
        + ' ' + dia + '/' + (mes+1) + '/' + ano
        + ' às '
        + hora + ':' + min + ':' + seg + '.';

    processMovement = {
        actionName: actionName, 
        actionDescription: actionDescription,
        processId: newChecklist.processId,
        userId: user.id
    };

    processMovementData.saveProcessMovement(processMovement);
}

exports.gerarLogMovimentacaoChecklist = async function (token, newChecklist) {
    const userDecoded = jwt.verify(token, authConfig.TOKEN_SECRET);
    const user = await userService.getUser(userDecoded.id);

    let data = new Date();
    var dia = data.getDate(); 
    var mes = data.getMonth();
    var ano = data.getFullYear(); 
    var hora = data.getHours();
    var min = data.getMinutes();
    var seg = data.getSeconds();

    let actionName = "Movimentação de Checklist";

    let actionDescription = 'Usuário ' + user.name + ' ' + user.lastName;

    if(newChecklist.status === '1'){
        actionDescription = actionDescription + ' movimentou o checklist ' + newChecklist.name + ' para em Elaboração ';
    }
    if(newChecklist.status === '2'){
        actionDescription = actionDescription + ' enviou o checklist ' + newChecklist.name + ' para aprovação ';
    }
    if(newChecklist.status === '3'){
        actionDescription = actionDescription + ' aprovou o checklist ' + newChecklist.name + ' ';
    }
    if(newChecklist.status === '4'){
        actionDescription = actionDescription + ' reprovou o checklist ' + newChecklist.name + ' ';
    }

    actionDescription = actionDescription
    + 'no dia'
    + ' ' + dia + '/' + (mes+1) + '/' + ano
    + ' às '
    + hora + ':' + min + ':' + seg + '.';

    processMovement = {
        actionName: actionName, 
        actionDescription: actionDescription,
        processId: newChecklist.processId,
        userId: user.id
    };

    processMovementData.saveProcessMovement(processMovement);
}