module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define("documents", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Document;
};