module.exports = (sequelize, Sequelize) => {
    const ProcessMovement = sequelize.define("processMovements", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      actionName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      actionDescription: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return ProcessMovement;
};