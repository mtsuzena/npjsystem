const audienciaData = require('../datas/audiencia.data');

exports.getAudiencias = function () {
    return audienciaData.getAudiencias();
}

exports.getAudiencia = async function (id) {
    return audienciaData.getAudiencia(id);
}

exports.getAudienciaByProcessId = async function (processId) {
    return audienciaData.getAudienciaByProcessId(processId);
}

exports.saveAudiencia = async function (audiencia) {
    return audienciaData.saveAudiencia(audiencia);
}

exports.deleteAudiencia = async function (id) {
    return audienciaData.deleteAudiencia(id);
}