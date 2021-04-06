const db = require("../models");
const ProcessType = db.processType;

exports.getProcessTypes = function () {
    return ProcessType.findAll();
};

exports.getProcessType = function (id) {
    return ProcessType.findByPk(id);
};

exports.getProcessTypeByName = function (name) {
    return ProcessType.findOne({
        where: {
            name: name
        }
    });
};

exports.saveProcessType = function (processType) {
	return ProcessType.create(processType);
};

exports.deleteProcessType = function (id) {
	return ProcessType.destroy({
        where: {
            id: id
        }
    })
};

exports.updateProcessType = function (processType) {
    processType.save();
};