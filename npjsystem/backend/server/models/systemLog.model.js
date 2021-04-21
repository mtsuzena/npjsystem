module.exports = (sequelize, Sequelize) => {
    const SystemLog = sequelize.define("systemLogs", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return SystemLog;
};