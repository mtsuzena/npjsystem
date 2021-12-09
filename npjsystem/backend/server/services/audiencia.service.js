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

exports.updateAudiencia = async function (id, audiencia) {
    const existingAudiencia = await audienciaData.getAudiencia(id);
    existingAudiencia.clienteNotificado = audiencia.clienteNotificado

    return audienciaData.updateAudiencia(existingAudiencia);
}