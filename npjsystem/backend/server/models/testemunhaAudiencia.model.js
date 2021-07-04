module.exports = (sequelize, Sequelize) => {
    const TestemunhaAudiencia = sequelize.define("testemunhasAudiencia", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING,
      },
      endereco: {
        type: Sequelize.STRING,
      },
    });
  
    return TestemunhaAudiencia;
};