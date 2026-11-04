const banco = require('./conexao');

const LivroSchema = new banco.Schema({
  titulo: String,
  codEditora: Number,
  resumo: String,
  autores: [String],
});

const Livro = banco.model('Livro', LivroSchema, 'livros');

module.exports = Livro;
