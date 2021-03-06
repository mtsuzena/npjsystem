module.exports = (sequelize, Sequelize) => {
    const Audiencia = sequelize.define("audiencias", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      /* 
      0 - Conciliaçao
      1 - Instrução
      2 - Julgamento
      */
      tipo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      clienteNotificado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      /* 
      1 - Presencial
      2 - Online
      */
      modalidade: {
        type: Sequelize.INTEGER
      },
      local: {
        type: Sequelize.STRING
      },
    });
  
    return Audiencia;
};