module.exports = (sequelize, Sequelize) => {
    const Process = sequelize.define("processes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      requerido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pastaFisica: {
        type: Sequelize.STRING
      },
      begins_date: {
        type: Sequelize.DATE
      },
      court_hearing_date: {
        type: Sequelize.DATE
      },
      isFiled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  
    return Process;
};