const banco = require('mongoose');

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// Conexão com o MongoDB local, banco "livraria"
// (pode ser sobrescrita pela variável de ambiente MONGODB_URI)
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/livraria';

banco
  .connect(uri, options)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((erro) => console.error('Erro ao conectar ao MongoDB:', erro.message));

module.exports = banco;
