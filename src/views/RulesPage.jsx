import { Link } from "react-router-dom";
import "../styles/buttons.css";
import "../styles/rules.css";

export default function RulesPage() {
  const sections = [
    { id: "como-participar", title: "1. ¿Cómo participar?" },
    { id: "reglas-concurso", title: "2. Reglas del concurso" },
    { id: "vigencia", title: "3. Vigencia" },
    { id: "metodo-seleccion", title: "4. Método de selección" },
  ];

  return (
    <main className="rules-page">
      <header className="rules-header">
        <div className="rules-header-inner">
          <Link to="/" className="btn-top-return">
            ← Inicio
          </Link>
          <h1 className="rules-title">Reglas oficiales</h1>
          <span className="w-12" />
        </div>
      </header>

      <div className="rules-wrap">
        <div className="rules-grid">
          {/* Mobile TOC */}
          <details className="rules-mobile-toc">
            <summary>Índice de secciones</summary>
            <nav>
              <ol className="space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a className="toc-link" href={`#${s.id}`}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </details>

          {/* Desktop TOC */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="toc-card sticky top-20">
              <h2 className="toc-heading">Índice</h2>
              <ol className="toc-list">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a className="toc-link" href={`#${s.id}`}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-8 xl:col-span-9">
            <div className="rules-card">
              <div className="rules-body rules-prose">
                <section id="como-participar" className="rules-section">
                  <h2>1. ¿Cómo participar?</h2>
                  <ol>
                    <li>Compra 2 o más productos Energizer en SuperMax.</li>
                    <li>Guarda tu recibo.</li>
                    <li>Sube tu recibo a preparateygana.com.</li>
                    <li>Participa para ganar un generador inverter de 4,800W.</li>
                  </ol>
                </section>

                <hr />

                <section id="reglas-concurso" className="rules-section">
                  <h2>2. Reglas del concurso</h2>
                  <ul>
                    <li>
                      El concurso aplica únicamente en las compras realizadas
                      en las tiendas SuperMax.
                    </li>
                    <li>Ser mayor de 18 años.</li>
                    <li>Residente de Puerto Rico.</li>
                    <li>
                      Cumplir con los requisitos de compra y registro del
                      recibo.
                    </li>
                  </ul>
                </section>

                <hr />

                <section id="vigencia" className="rules-section">
                  <h2>3. Vigencia</h2>
                  <ul>
                    <li>
                      El concurso tiene vigencia desde el{" "}
                      <strong>20 de agosto</strong> hasta el{" "}
                      <strong>30 de septiembre</strong>.
                    </li>
                    <li>
                      El concurso es válido sólo en las compras realizadas en
                      SuperMax.
                    </li>
                  </ul>
                </section>

                <hr />

                <section id="metodo-seleccion" className="rules-section">
                  <h2>4. Método de selección</h2>
                  <ul>
                    <li>
                      El ganador será seleccionado de forma aleatoria
                      mediante una ruleta digital supervisada por el
                      organizador.
                    </li>
                    <li>
                      Se estará anunciando al ganador el{" "}
                      <strong>martes 6 de octubre</strong>.
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
