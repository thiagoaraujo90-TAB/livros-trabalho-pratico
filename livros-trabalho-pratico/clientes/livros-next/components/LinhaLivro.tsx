import ControleEditora from "@/classes/controle/ControleEditora";
import Livro from "@/classes/modelo/Livro";

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: string) => void;
}

export default function LinhaLivro({ livro, excluir }: LinhaLivroProps) {
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>
        {livro.titulo}
        <div>
          <button
            className="btn btn-danger btn-sm mt-2"
            onClick={() => excluir(livro.codigo)}
          >
            Excluir
          </button>
        </div>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {livro.autores.map((autor, i) => (
            <li key={i}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}
