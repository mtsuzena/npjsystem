const db = require("../models");
const TestemunhaAudiencia = db.testemunhaAudiencia;

exports.getTestemunhasAudienciaByAudienciaId = function (audienciaId) {
    return TestemunhaAudiencia.findAll({
        where: {
            audienciaId: audienciaId
        },
        include: [
            {
                model: db.audiencia,
            }
        ]
    });
};

exports.saveTestemunhaAudiencia = function (testemunhaAudiencia) {
	return TestemunhaAudiencia.create(testemunhaAudiencia);
};