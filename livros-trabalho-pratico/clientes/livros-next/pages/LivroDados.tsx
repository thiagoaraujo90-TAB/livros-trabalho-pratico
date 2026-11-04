import Head from "next/head";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import ControleLivros from "@/classes/controle/ControleLivros";
import ControleEditora from "@/classes/controle/ControleEditora";
import Livro from "@/classes/modelo/Livro";

const controleLivros = new ControleLivros();
const controleEditora = new ControleEditora();

export default function LivroDados() {
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState<string>("");
  const [resumo, setResumo] = useState<string>("");
  const [autores, setAutores] = useState<string>("");
  const [codEditora, setCodEditora] = useState<number>(opcoes[0].value);

  const router = useRouter();

  const tratarCombo = (event: ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const livro = new Livro(
      "",
      codEditora,
      titulo,
      resumo,
      autores.split("\n").filter((a) => a.trim() !== "")
    );

    controleLivros.incluir(livro).then(() => {
      router.push("/LivroLista");
    });
  };

  return (
    <>
      <Head>
        <title>Dados do Livro</title>
      </Head>
      <main className="container">
        <h1 className="my-3">Dados do Livro</h1>
        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título
            </label>
            <input
              id="titulo"
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">
              Resumo
            </label>
            <textarea
              id="resumo"
              className="form-control"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editora" className="form-label">
              Editora
            </label>
            <select
              id="editora"
              className="form-select"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">
              Autores (um por linha)
            </label>
            <textarea
              id="autores"
              className="form-control"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar Dados
          </button>
        </form>
      </main>
    </>
  );
}
