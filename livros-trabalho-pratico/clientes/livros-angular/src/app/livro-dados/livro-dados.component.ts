import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleLivrosService } from '../controle-livros.service';
import { ControleEditoraService } from '../controle-editora.service';

@Component({
  selector: 'app-livro-dados',
  imports: [FormsModule],
  templateUrl: './livro-dados.component.html',
})
export class LivroDadosComponent {
  private servEditora = inject(ControleEditoraService);
  private servLivros = inject(ControleLivrosService);
  private router = inject(Router);

  public livro: Livro = new Livro();
  public autoresForm: string = '';
  public editoras: Array<Editora> = this.servEditora.getEditoras();

  constructor() {
    this.livro.codEditora = this.editoras[0].codEditora;
  }

  incluir = () => {
    this.livro.autores = this.autoresForm
      .split('\n')
      .filter((autor) => autor.trim() !== '');

    this.servLivros.incluir(this.livro).then(() => {
      this.router.navigateByUrl('/lista');
    });
  };
}
