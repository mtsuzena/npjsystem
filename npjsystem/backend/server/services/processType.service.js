const processTypeData = require('../datas/processType.data');

exports.getProcessTypes = function () {
    return processTypeData.getProcessTypes();
}

exports.getProcessType = async function (id) {
    const existingProcessType = await processTypeData.getProcessType(id);
    if (!existingProcessType) throw new Error('Process Type not found');
    
    return existingProcessType;
}

exports.getProcessTypeByName = async function(name){
    const existingProcessType = await processTypeData.getProcessTypeByName(name);
    if (!existingProcessType) throw new Error('Process Type not found');

    return existingProcessType;
}

exports.saveProcessType = async function (processType) {

    if(!processType.name) throw new Error('Process Type shall have a name');

    const existingName = await processTypeData.getProcessTypeByName(processType.name);
    if (existingName) throw new Error('Process Type name already exists');

    return processTypeData.saveProcessType(processType);
}

exports.deleteProcessType = async function (id) {
    const existingProcessType = await processTypeData.getProcessType(id);
    if (!existingProcessType) throw new Error('Process Type not found');

    return processTypeData.deleteProcessType(id);
}

exports.updateProcessType = async function (id, processType) {
    const existingProcessType = await processTypeData.getProcessType(id);
    if (!existingProcessType) throw new Error('Process Type not found');

    const existingName = await processTypeData.getProcessTypeByName(processType.name);
    if (existingName) throw new Error('Process Type name already exists');

    existingProcessType.name = processType.name;

    return processTypeData.updateProcessType(existingProcessType);
}
