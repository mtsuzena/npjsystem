const db = require("../models");
const ProcessMovement = db.processMovement;

exports.getProcessMovementsByProcessId = function (processId) {
    return ProcessMovement.findAll({
        where: {
            processId: processId
        },
        include: [
            {
                model: db.user,
                attributes: ['name', 'imgSrc']
            }
        ]
    });
};

exports.saveProcessMovement = function (processMovement) {
	return ProcessMovement.create(processMovement);
};

exports.deleteProcessMovement = function (id) {
	return ProcessMovement.destroy({
        where: {
            id: id
        }
    })
};