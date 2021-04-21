const db = require("../models");
const SystemLog = db.systemLog;

exports.getSystemLogs = function () {
    return SystemLog.findAll({
        include: [
            {
                model: db.user,
                attributes: ['id', 'name', 'lastName']
            }
        ]
    });
};

exports.getSystemLog = function (id) {
    return SystemLog.findByPk(id, {
        include: [
            {
                model: db.user,
                attributes: ['id', 'name', 'lastName']
            }
        ]
    });
};

exports.getSystemLogByUserId = function (userId) {
    return SystemLog.findOne({
        where: {
            userId: userId
        },
        include: [
            {
                model: db.user,
                attributes: ['id', 'name', 'lastName']
            }
        ]
    });
};

exports.saveSystemLog = function (systemLog) {
	return SystemLog.create(systemLog);
};