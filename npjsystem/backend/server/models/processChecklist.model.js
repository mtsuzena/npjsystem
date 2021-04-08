module.exports = (sequelize, Sequelize) => {
    const ProcessChecklist = sequelize.define("processChecklists", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isChecked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deadline: {
        type: Sequelize.DATE
      }
    });
  
    return ProcessChecklist;
};