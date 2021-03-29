module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profiles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Profile;
};