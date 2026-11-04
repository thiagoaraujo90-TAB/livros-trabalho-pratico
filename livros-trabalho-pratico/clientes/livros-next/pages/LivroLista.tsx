import Head from "next/head";
import { useState, useEffect } from "react";
import ControleLivros from "@/classes/controle/ControleLivros";
import Livro from "@/classes/modelo/Livro";
import LinhaLivro from "@/components/LinhaLivro";

const controleLivros = new ControleLivros();

export default function LivroLista() {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    if (!carregado) {
      controleLivros.obterLivros().then((livros) => {
        setLivros(livros);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const excluir = (codigo: string) => {
    controleLivros.excluir(codigo).then(() => {
      setCarregado(false);
    });
  };

  return (
    <>
      <Head>
        <title>Catálogo de Livros</title>
      </Head>
      <main className="container">
        <h1 className="my-3">Catálogo de Livros</h1>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro key={index} livro={livro} excluir={excluir} />
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
