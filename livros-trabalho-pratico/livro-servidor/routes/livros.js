const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

const express = require('express');
const router = express.Router();

// GET /livros -> lista todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await obterLivros();
    res.json(livros);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Falha ao obter os livros', erro: erro.message });
  }
});

// POST /livros -> inclui um livro (corpo da requisição em JSON)
router.post('/', async (req, res) => {
  try {
    await incluir(req.body);
    res.json({ mensagem: 'Livro incluído com sucesso' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Falha ao incluir o livro', erro: erro.message });
  }
});

// DELETE /livros/:codigo -> exclui o livro com o _id informado
router.delete('/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    await excluir(codigo);
    res.json({ mensagem: 'Livro excluído com sucesso' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Falha ao excluir o livro', erro: erro.message });
  }
});

module.exports = router;
