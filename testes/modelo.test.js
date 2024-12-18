const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas();
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastro de três respostas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_resposta(0, '2');
  modelo.cadastrar_resposta(0, 'pi/2');
  modelo.cadastrar_resposta(0, '11');

  const respostas = modelo.get_respostas(0);
  expect(respostas.length).toBe(3);
  expect(respostas[0].texto).toBe('2');
  expect(respostas[1].texto).toBe('pi/2');
  expect(respostas[2].texto).toBe('11');
});


test('Testando obter 4 perguntas por ID', () => {
  modelo.cadastrar_pergunta('20 + 30 = ?');
  modelo.cadastrar_pergunta('Qual a derivada de f(x) = exp(x)?');
  modelo.cadastrar_pergunta('sen(pi/2) = ?');
  modelo.cadastrar_pergunta('Qual o raio da Terra?');

  const perguntas = modelo.listar_perguntas();
  expect(modelo.get_pergunta(perguntas[0].id_pergunta).texto).toBe('20 + 30 = ?');
  expect(modelo.get_pergunta(perguntas[1].id_pergunta).texto).toBe('Qual a derivada de f(x) = exp(x)?');
  expect(modelo.get_pergunta(perguntas[2].id_pergunta).texto).toBe('sen(pi/2) = ?');
  expect(modelo.get_pergunta(perguntas[3].id_pergunta).texto).toBe('Qual o raio da Terra?');
});
