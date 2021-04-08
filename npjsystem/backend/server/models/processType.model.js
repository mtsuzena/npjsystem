module.exports = (sequelize, Sequelize) => {
    const ProcessType = sequelize.define("processTypes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return ProcessType;
};