module.exports = (sequelize, Sequelize) => {
    const Consultation = sequelize.define("consultations", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      consultationDate: {
        type: Sequelize.DATE
      },
      motivo: {
        type: Sequelize.STRING
      },
    });
  
    return Consultation;
};