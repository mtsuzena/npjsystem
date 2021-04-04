const db = require("../models");
const Consultation = db.consultation;

exports.getConsultations = function () {
    return Consultation.findAll({
        include: [
            {
                model: db.user,
                // include: {
                //     model: db.role
                // }
            },
            {
                model: db.customer
            }
        ]
    });
};

exports.getConsultation = function (id) {
    return Consultation.findByPk(id, {
        include: [
            {
                model: db.user,
            },
            {
                model: db.customer
            }
        ]
    });
};

exports.saveConsultation = function (consultation) {
	return Consultation.create(consultation);
};

exports.deleteConsultation = function (id) {
	return Consultation.destroy({
        where: {
            id: id
        }
    })
};

exports.updateConsultation = function (consultation) {
    consultation.save();
};