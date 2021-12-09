const db = require("../models");
const Audiencia = db.audiencia;

exports.getAudiencias = function () {
    return Audiencia.findAll({
        include: [
            {
                model: db.testemunhaAudiencia,
            }
        ],
        order: [
            ['data', 'DESC']
        ]
    });
};

exports.getAudiencia = function (id) {
    return Audiencia.findByPk(id, {
        include: [
            {
                model: db.testemunhaAudiencia,
            }
        ]
    });
};

exports.getAudienciaByProcessId = function (processId) {
    return Audiencia.findAll({
        where: {
            processId: processId
        },
        include: [
            {
                model: db.testemunhaAudiencia,
            }
        ]
    });
};

exports.saveAudiencia = function (audiencia) {
	return Audiencia.create(audiencia);
};

exports.deleteAudiencia = function (id) {
	return Audiencia.destroy({
        where: {
            id: id
        }
    })
};

exports.updateAudiencia = function (audiencia) {
    audiencia.save();
};