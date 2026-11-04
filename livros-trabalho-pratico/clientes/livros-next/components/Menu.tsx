import Link from "next/link";

export default function Menu() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">Livraria</span>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" href="/LivroLista">
              Catálogo
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/LivroDados">
              Novo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
