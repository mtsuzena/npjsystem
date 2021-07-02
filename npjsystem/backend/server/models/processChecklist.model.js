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
      consideracoesRevisaoProfessor: {
        type: Sequelize.STRING
      },
      isChecked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      /* 
      0 - Não iniciado
      1 - Em elaboração
      2 - Em aprovação
      3 - Aprovado
      4 - Reprovado
      */
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      deadline: {
        type: Sequelize.DATE
      }
    });
  
    return ProcessChecklist;
};