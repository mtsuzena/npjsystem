const processData = require('../datas/process.data.js');
const customerService = require('./customer.service');
const userService = require('./user.service')
const processTypeService = require('./processType.service')

exports.getProcesses = function () {
    return processData.getProcesses();
}

exports.getProcess = async function (id) {
    return processData.getProcess(id);
}

exports.getProcessesByUserId = async function (userId) {
    return processData.getProcessesByUserId(userId);
}

exports.getProcessByProcessNumber = async function (processNumber) {
    return processData.getProcessByProcessNumber(processNumber);
}

exports.saveProcess = async function (process) {

    if(!process.customerId) throw new Error('Process shall have a Customer');
    if(!process.processTypeId) throw new Error('Process shall have a Process Type');
    if(!process.number) throw new Error('Process shall have a Number');
    if(!process.requerido) throw new Error('Process shall have a Requerido');

    if(process.userId){
        const existingUser = await userService.getUser(process.userId);
        if (!existingUser) throw new Error('User not found');
    }

    const existingCustomer = await customerService.getCustomer(process.customerId);
    if (!existingCustomer) throw new Error('Customer not found');

    const existingProcessType = await processTypeService.getProcessType(process.processTypeId);
    if (!existingProcessType) throw new Error('Process Type not found');

    const existingProcessWithNumber = await processData.getProcessByNumber(process.number);
    if (existingProcessWithNumber) throw new Error('Process Number already exists');
    
    return processData.saveProcess(process);
}

exports.deleteProcess = async function (id) {
    const existingProcess = await processData.getProcess(id);
    if (!existingProcess) throw new Error('Process not found');

    return processData.deleteProcess(id);
}

exports.updateProcess = async function (id, process) {

    const existingProcess = await processData.getProcess(id);
    if (!existingProcess) throw new Error('Process not found');

    if(process.userId){
        const existingUser = await userService.getUser(process.userId);
        if (!existingUser) throw new Error('User not found');

        existingProcess.userId = process.userId;
    }

    if(process.requerido){
        existingProcess.requerido = process.requerido;
    }

    if(process.pastaFisica){
        existingProcess.pastaFisica = process.pastaFisica;
    }

    if(process.customerId){
        const existingCustomer = await customerService.getCustomer(process.customerId);
        if (!existingCustomer) throw new Error('Customer not found');

        existingProcess.customerId = process.customerId;
    }

    if(process.processTypeId){
        const existingProcessType = await processTypeService.getProcessType(process.processTypeId);
        if (!existingProcessType) throw new Error('Process Type not found');

        existingProcess.processTypeId = process.processTypeId;
    }

    if(process.number){
        const existingProcessWithNumber = await processData.getProcessByNumber(process.number);
        if (existingProcessWithNumber && existingProcessWithNumber.id != id) throw new Error('Process Number already exists');

        existingProcess.number = process.number;
    }

    if(process.isFiled !== undefined){
        existingProcess.isFiled = process.isFiled;
    }

    if(process.court_hearing_date){
        existingProcess.court_hearing_date = process.court_hearing_date;
    }

    if(process.begins_date){
        existingProcess.begins_date = process.begins_date;
    }

    return processData.updateProcess(existingProcess);
}

exports.arquivarProcesso = async function (id, isFiled) {

    const existingProcess = await processData.getProcess(id);
    if (!existingProcess) throw new Error('Process not found');

    existingProcess.isFiled = isFiled;

    return processData.updateProcess(existingProcess);
}
