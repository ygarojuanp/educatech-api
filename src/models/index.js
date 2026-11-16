const { Sequelize } = require('sequelize');
const config = require('../../config/config');
const Aluno = require('./aluno');
const Professor = require('./professor');
const Curso = require('./curso');
const Matricula = require('./matricula');

const environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[environment]);

const db = {
  sequelize,
  Sequelize,
  Aluno: Aluno(sequelize),
  Professor: Professor(sequelize),
  Curso: Curso(sequelize),
  Matricula: Matricula(sequelize)
};

db.Professor.hasMany(db.Curso, { foreignKey: 'professorId', as: 'cursos' });
db.Curso.belongsTo(db.Professor, { foreignKey: 'professorId', as: 'professor' });
db.Aluno.hasMany(db.Matricula, { foreignKey: 'alunoId', as: 'matriculas' });
db.Curso.hasMany(db.Matricula, { foreignKey: 'cursoId', as: 'matriculas' });
db.Matricula.belongsTo(db.Aluno, { foreignKey: 'alunoId', as: 'aluno' });
db.Matricula.belongsTo(db.Curso, { foreignKey: 'cursoId', as: 'curso' });

module.exports = db;
