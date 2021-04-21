const systemLogData = require('../datas/systemLog.data');

exports.getSystemLogs = function () {
    return systemLogData.getSystemLogs();
}

exports.getSystemLog = async function (id) {
    return systemLogData.getSystemLog(id);
}

exports.getSystemLogByUserId = async function (userId) {
    return systemLogData.getSystemLogByUserId(userId);
}

exports.saveSystemLog = async function (systemLog) {
    return systemLogData.saveSystemLog(systemLog);
}