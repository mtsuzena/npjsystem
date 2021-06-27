const db = require("../models");
const ProcessChecklist = db.processChecklist;

exports.getProcessChecklists = function () {
    return ProcessChecklist.findAll({
        include: [
            {
                model: db.process
            },
            {
                model: db.document
            },
        ]
    });
};

exports.getProcessChecklist = function (id) {
    return ProcessChecklist.findByPk(id, {
        include: [
            {
                model: db.process
            },
            {
                model: db.document
            },
        ]
    });
};

exports.saveProcessChecklist = function (processChecklist) {
	return ProcessChecklist.create(processChecklist);
};

exports.deleteProcessChecklist = function (id) {
	return ProcessChecklist.destroy({
        where: {
            id: id
        }
    })
};

exports.updateProcessChecklist = function (processChecklist) {
    processChecklist.save();
};