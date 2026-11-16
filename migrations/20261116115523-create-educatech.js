module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alunos', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING(255), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      data_nascimento: Sequelize.DATEONLY,
      telefone: Sequelize.STRING(14),
      data_cadastro: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
    await queryInterface.createTable('professores', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING(255), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      telefone: Sequelize.STRING(14),
      especialidade: Sequelize.STRING(100)
    });
    await queryInterface.createTable('cursos', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING(255), allowNull: false },
      descricao: Sequelize.TEXT,
      carga_horaria: { type: Sequelize.INTEGER, allowNull: false },
      valor: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      professor_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'professores', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT'
      },
      data_cadastro: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
    await queryInterface.createTable('matriculas', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      aluno_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'alunos', key: 'id' }, onDelete: 'CASCADE' },
      curso_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'cursos', key: 'id' }, onDelete: 'CASCADE' },
      data_matricula: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      nota_final: Sequelize.DECIMAL(4, 2),
      situacao: { type: Sequelize.ENUM('EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'), allowNull: false, defaultValue: 'EM_ANDAMENTO' }
    });
    await queryInterface.addConstraint('matriculas', {
      fields: ['aluno_id', 'curso_id'], type: 'unique', name: 'uk_aluno_curso'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('matriculas');
    await queryInterface.dropTable('cursos');
    await queryInterface.dropTable('professores');
    await queryInterface.dropTable('alunos');
  }
};
