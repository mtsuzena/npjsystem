module.exports = (sequelize, Sequelize) => {
    const Process = sequelize.define("processes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false
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