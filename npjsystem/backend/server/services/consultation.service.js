const consultationData = require('../datas/consultation.data.js');
const customerService = require('../services/customer.service');
const userService = require('../services/user.service');

exports.getConsultations = function () {
    return consultationData.getConsultations();
}

exports.getConsultation = async function (id) {
    return consultationData.getConsultation(id);
}

exports.getConsultationsByDate = async function (date) {
    return consultationData.getConsultationsByDate(date);
}

exports.saveConsultation = async function (consultation) {

    if(!consultation.customerId) throw new Error('Consultation shall have a Customer');
    if(!consultation.consultationDate) throw new Error('Consultation shall have a Date');

    if(consultation.userId){
        const existingCustomer = await customerService.getCustomer(consultation.customerId);
        if (!existingCustomer) throw new Error('Customer not found');
    }

    const existingConsultationWithDateAndUser = await consultationData.getConsultationByUserAndDate(consultation.userId, consultation.consultationDate);
    if (existingConsultationWithDateAndUser) throw new Error('User is already committed to this data');

    return consultationData.saveConsultation(consultation);
}

exports.deleteConsultation = async function (id) {
    const existingConsultation = await consultationData.getConsultation(id);
    if (!existingConsultation) throw new Error('Consultation not found');

    return consultationData.deleteConsultation(id);
}

exports.updateConsultation = async function (id, consultation) {
    const existingConsultation = await consultationData.getConsultation(id);
    if (!existingConsultation) throw new Error('Consultation not found');

    const existingUser = await userService.getUser(consultation.userId);
    if (!existingUser) throw new Error('User not found');

    const existingCustomer = await customerService.getCustomer(consultation.customerId);
    if (!existingCustomer) throw new Error('Customer not found');

    const existingConsultationWithDateAndUser = await consultationData.getConsultationByUserAndDate(consultation.userId, consultation.consultationDate);
    if(existingCustomer.consultationDate != consultation.consultationDate){
        if (existingConsultationWithDateAndUser) throw new Error('User is already committed to this data');
    }

    if(consultation.motivo){
        existingConsultation.motivo = consultation.motivo;
    }

    existingConsultation.userId = consultation.userId;
    existingConsultation.customerId = consultation.customerId;
    existingConsultation.consultationDate = consultation.consultationDate;

    return consultationData.updateConsultation(existingConsultation);
}
