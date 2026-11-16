const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Aluno', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(255), allowNull: false, validate: { notEmpty: true } },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  dataNascimento: { type: DataTypes.DATEONLY, field: 'data_nascimento' },
  telefone: DataTypes.STRING(14),
  dataCadastro: { type: DataTypes.DATE, field: 'data_cadastro', defaultValue: DataTypes.NOW }
}, { tableName: 'alunos', timestamps: false });