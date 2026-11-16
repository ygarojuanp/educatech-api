const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Curso', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(255), allowNull: false, validate: { notEmpty: true } },
  descricao: DataTypes.TEXT,
  cargaHoraria: { type: DataTypes.INTEGER, allowNull: false, field: 'carga_horaria', validate: { min: 1 } },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } },
  professorId: { type: DataTypes.INTEGER, allowNull: false, field: 'professor_id' },
  dataCadastro: { type: DataTypes.DATE, field: 'data_cadastro', defaultValue: DataTypes.NOW }
}, { tableName: 'cursos', timestamps: false });