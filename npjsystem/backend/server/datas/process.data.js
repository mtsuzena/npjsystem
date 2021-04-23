const db = require("../models");
const Process = db.process;

exports.getProcesses = function () {
    return Process.findAll({
        include: [
            {
                model: db.user
            },
            {
                model: db.customer
            },
            {
                model: db.processType
            },
            {
                model: db.processChecklist
            }
        ]
    });
};

exports.getProcess = function (id) {
    return Process.findByPk(id, {
        include: [
            {
                model: db.user
            },
            {
                model: db.customer
            },
            {
                model: db.processType
            },
            {
                model: db.processChecklist
            }
        ]
    });
};

exports.getProcessesByUserId = function (userId) {
    return Process.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: db.user
            },
            {
                model: db.customer
            },
            {
                model: db.processType
            },
            {
                model: db.processChecklist
            }
        ]
    });
};

exports.getProcessByNumber = function (number) {
    return Process.findOne({
        where: {
            number: number
        }
    });
};

exports.saveProcess = function (process) {
	return Process.create(process);
};

exports.deleteProcess = function (id) {
	return Process.destroy({
        where: {
            id: id
        }
    })
};

exports.updateProcess = function (process) {
    process.save();
};