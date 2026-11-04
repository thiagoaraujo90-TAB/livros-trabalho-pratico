# Trabalho Prático – DGT2815: Integração de Páginas Web com Banco de Dados

Servidor **Express + Mongoose** com banco **MongoDB** (NoSQL) e três front-ends
consumindo a mesma API HTTP: **React**, **Next.js** e **Angular**.

## Estrutura

```
livro-servidor/      API REST (Express + Mongoose) – porta 3030
clientes/
  livros-react/      React (CRA + TypeScript) – porta 3000
  livros-next/       Next.js (pages router) – porta 3000
  livros-angular/    Angular – porta 4200
```

## Pré-requisitos

- Node.js 20 ou superior e npm
- MongoDB em execução em `localhost:27017` e MongoDB Compass
- Visual Studio Code; Postman ou Boomerang para testar a API

## 1º Procedimento – Servidor

1. No Compass, crie o banco **livraria** com a coleção **livros** (*Create Database*).
2. Instale e execute:

```bash
cd livro-servidor
npm install
npm start
```

O servidor sobe em `http://localhost:3030`.

| Método | Rota             | Descrição                                   |
|--------|------------------|---------------------------------------------|
| GET    | `/livros`        | Lista todos os livros                       |
| POST   | `/livros`        | Inclui um livro (JSON no corpo)             |
| DELETE | `/livros/:codigo`| Exclui o livro com o `_id` informado        |

Exemplo de corpo para o POST:

```json
{
  "titulo": "Usando HTML5",
  "codEditora": 1,
  "resumo": "Introdução ao HTML5",
  "autores": ["Fulano", "Sicrano"]
}
```

Organização do código:

- `modelo/conexao.js` – conexão com o MongoDB via Mongoose (`useUnifiedTopology` e `useNewUrlParser`)
- `modelo/livro-schema.js` – `LivroSchema` e modelo `Livro` (coleção `livros`)
- `modelo/livro-dao.js` – `obterLivros`, `incluir` e `excluir`
- `routes/livros.js` – rotas GET, POST e DELETE
- `app.js` – CORS, rota `/livros`; `bin/www` – porta 3030

> A variável de ambiente `MONGODB_URI` pode substituir o endereço padrão
> `mongodb://localhost:27017/livraria`.

## 2º Procedimento – Clientes

Com o servidor em execução, rode **um cliente por vez**
(React e Next usam a porta 3000; para rodar juntos, use `npm run dev -- -p 3001` no Next).

```bash
# React  -> http://localhost:3000
cd clientes/livros-react && npm install && npm start

# Next   -> http://localhost:3000
cd clientes/livros-next && npm install && npm run dev

# Angular -> http://localhost:4200
cd clientes/livros-angular && npm install && npx ng serve
```

Em todos os clientes:

- `Livro.codigo` é `String` (compatível com o `_id` do MongoDB);
- `ControleLivros` (ou `ControleLivrosService`, no Angular) usa `fetch` assíncrono com
  `obterLivros`, `incluir` e `excluir` apontando para `http://localhost:3030/livros`;
- a interface `LivroMongo` adapta o tipo `Livro` ao formato do servidor;
- as telas de lista e de cadastro usam `then` para recarregar a lista ou navegar após a operação.

No Angular, `ControleEditoraService` (`@Injectable`) mantém três editoras em JSON, com
`getEditoras` e `getNomeEditora` (via `filter`). React e Next têm o equivalente em `ControleEditora`.

## Observações

- O Mongoose está fixado na versão 8, pois a versão 9 rejeita as opções
  `useUnifiedTopology` e `useNewUrlParser` pedidas no roteiro.
- O roteiro cita `obterTodos` em alguns trechos; o método implementado é `obterLivros`,
  nome usado na própria descrição do `ControleLivros`.
