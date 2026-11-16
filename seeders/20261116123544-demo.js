module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('professores', [
      { nome: 'Marcos Antônio', email: 'marcos@educatech.local', especialidade: 'Frontend' },
      { nome: 'João Pedro', email: 'joao@educatech.local', especialidade: 'Backend' }
    ]);
    await queryInterface.bulkInsert('alunos', [
      { nome: 'Ana Beatriz', email: 'ana@educatech.local', data_nascimento: '2000-05-12' },
      { nome: 'Pedro Henrique', email: 'pedro@educatech.local', data_nascimento: '1998-08-20' }
    ]);
    await queryInterface.bulkInsert('cursos', [
      { nome: 'FullStack', descricao: 'Do básico ao avançado', carga_horaria: 160, valor: 5000, professor_id: 1 },
      { nome: 'Analytics', descricao: 'Data analytics', carga_horaria: 120, valor: 3500.50, professor_id: 2 }
    ]);
    await queryInterface.bulkInsert('matriculas', [
      { aluno_id: 1, curso_id: 1, nota_final: 9.5, situacao: 'CONCLUIDA' },
      { aluno_id: 2, curso_id: 2, situacao: 'EM_ANDAMENTO' }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('matriculas');
    await queryInterface.bulkDelete('cursos');
    await queryInterface.bulkDelete('alunos');
    await queryInterface.bulkDelete('professores');
  }
};
