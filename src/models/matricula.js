const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Matricula', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  alunoId: { type: DataTypes.INTEGER, allowNull: false, field: 'aluno_id' },
  cursoId: { type: DataTypes.INTEGER, allowNull: false, field: 'curso_id' },
  dataMatricula: { type: DataTypes.DATE, field: 'data_matricula', defaultValue: DataTypes.NOW },
  notaFinal: {
    type: DataTypes.DECIMAL(4, 2),
    field: 'nota_final',
    validate: { min: 0, max: 10 }
  },
  situacao: {
    type: DataTypes.ENUM('EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'),
    allowNull: false,
    defaultValue: 'EM_ANDAMENTO'
  }
}, {
  tableName: 'matriculas',
  timestamps: false,
  indexes: [{ unique: true, fields: ['aluno_id', 'curso_id'], name: 'uk_aluno_curso' }]
});

