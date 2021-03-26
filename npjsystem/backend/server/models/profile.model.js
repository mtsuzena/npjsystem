module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profiles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      }
    });
  
    return Profile;
};