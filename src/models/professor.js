const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Professor', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(255), allowNull: false, validate: { notEmpty: true } },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  telefone: DataTypes.STRING(14),
  especialidade: DataTypes.STRING(100)
}, { tableName: 'professores', timestamps: false });