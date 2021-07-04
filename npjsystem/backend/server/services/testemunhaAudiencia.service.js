const testemunhaAudienciaData = require('../datas/testemunhaAudiencia.data');

exports.getTestemunhasAudienciaByAudienciaId = async function (audienciaId) {
    return testemunhaAudienciaData.getTestemunhasAudienciaByAudienciaId(audienciaId);
}

exports.saveTestemunhaAudiencia = async function (testemunhaAudiencia) {
    testemunhaAudiencia.fullName = testemunhaAudiencia.name + ' ' + testemunhaAudiencia.lastName;
    return testemunhaAudienciaData.saveTestemunhaAudiencia(testemunhaAudiencia);
}