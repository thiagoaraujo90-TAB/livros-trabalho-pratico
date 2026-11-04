import { Injectable } from '@angular/core';
import { Livro } from './livro';

const baseURL = 'http://localhost:3030/livros';

// Formato dos livros trafegados com o servidor Express/Mongoose
interface LivroMongo {
  _id?: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ControleLivrosService {
  async obterLivros(): Promise<Array<Livro>> {
    const resposta = await fetch(baseURL, { method: 'GET' });
    const livros: Array<LivroMongo> = await resposta.json();
    return livros.map(
      (livro) =>
        new Livro(
          livro._id ?? '',
          livro.codEditora,
          livro.titulo,
          livro.resumo,
          livro.autores
        )
    );
  }

  async excluir(codigo: string): Promise<boolean> {
    const resposta = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
    return resposta.ok;
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };
    const resposta = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livroMongo),
    });
    return resposta.ok;
  }
}
