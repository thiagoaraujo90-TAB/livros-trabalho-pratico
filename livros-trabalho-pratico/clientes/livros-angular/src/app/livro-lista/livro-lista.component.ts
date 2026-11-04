import { Component, OnInit, inject } from '@angular/core';
import { Livro } from '../livro';
import { ControleLivrosService } from '../controle-livros.service';
import { ControleEditoraService } from '../controle-editora.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
})
export class LivroListaComponent implements OnInit {
  private servEditora = inject(ControleEditoraService);
  private servLivros = inject(ControleLivrosService);

  livros: Array<Livro> = [];

  ngOnInit(): void {
    this.servLivros.obterLivros().then((livros) => {
      this.livros = livros;
    });
  }

  excluir = (codigo: string) => {
    this.servLivros.excluir(codigo).then(() => {
      this.servLivros.obterLivros().then((livros) => {
        this.livros = livros;
      });
    });
  };

  obterNome = (codEditora: number) => {
    return this.servEditora.getNomeEditora(codEditora);
  };
}
