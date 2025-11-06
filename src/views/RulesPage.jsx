import { Link } from "react-router-dom";
import "../styles/rules.css";

const establecimientosData = [
  { fecha: "01.NOV.2025", establecimiento: "Pueblo Río Hondo", horario: "11:00 AM – 2:00 PM", municipio: "Bayamón" },
  { fecha: "02.NOV.2025", establecimiento: "Supermax San Francisco", horario: "11:00 AM – 2:00 PM", municipio: "San Juan" },
  { fecha: "02.NOV.2025", establecimiento: "Econo Levittown", horario: "11:00 AM – 2:00 PM", municipio: "Toa Baja" },
  { fecha: "07.NOV.2025", establecimiento: "Econo Condado Moderno", horario: "3:00 PM – 6:00 PM", municipio: "San Juan" },
  { fecha: "07.NOV.2025", establecimiento: "Selectos Guaynabo", horario: "2:00 PM – 5:00 PM", municipio: "Guaynabo" },
];

const premiosData = [
  { premio: "Premio de efectivo", cantidad: 1, valor: "$500" },
  { premio: "Premios de efectivo", cantidad: 4, valor: "$100" },
];

export default function RulesPage() {
  const sections = [
    { id: "organizador", title: "Organizador" },
    { id: "duracion", title: "Duración" },
    { id: "productos", title: "Productos participantes" },
    { id: "establecimientos", title: "Establecimientos participantes" },
    { id: "elegibilidad", title: "Requisitos de participación" },
    { id: "mecanica", title: "Mecánica / Participación sin compra" },
    { id: "premios", title: "Premios y selección de ganadores" },
    { id: "notificacion", title: "Notificación y entrega de premios" },
    { id: "responsabilidad", title: "Limitaciones y responsabilidades" },
    { id: "transparencia", title: "Transparencia y legalidad" },
    { id: "contacto", title: "Contacto" },
  ];

  return (
    <main className="rules-page">
      <header className="rules-header">
        <div className="rules-header-inner">
          <Link to="/" className="btn-top-return">← Inicio</Link>
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
                    <a className="toc-link" href={`#${s.id}`}>{s.title}</a>
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
                    <a className="toc-link" href={`#${s.id}`}>{s.title}</a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-8 xl:col-span-9">
            <div className="rules-card">
              <div className="rules-body rules-prose">
                <section id="organizador" className="rules-section">
                  <h2>Organizador</h2>
                  <p>
                    Este concurso es organizado por <strong>Pepsi Cola Puerto Rico Distributing, LLC.</strong>
                    y administrado por <strong>Loud And Live Puerto Rico Inc.</strong>
                  </p>
                </section>

                <hr />

                <section id="duracion" className="rules-section">
                  <h2>Duración</h2>
                  <p>Del 1 de noviembre de 2025 al 15 de diciembre de 2025. Sorteo: 17 de diciembre de 2025.</p>
                </section>

                <hr />

                <section id="productos" className="rules-section">
                  <h2>Productos participantes</h2>
                  <ul>
                    <li>Starbucks Frappuccino Vanilla</li>
                    <li>Starbucks Doubleshot Energy Mocha</li>
                    <li>Starbucks Doubleshot Energy Vanilla</li>
                    <li>Starbucks Doubleshot Energy Coffee</li>
                    <li>Starbucks Frappuccino Mocha</li>
                  </ul>
                </section>

                <hr />

                <section id="establecimientos" className="rules-section">
                  <h2>Establecimientos participantes</h2>
                  <div className="overflow-x-auto">
                    <table className="rules-table">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Establecimiento</th>
                          <th>Horario</th>
                          <th>Municipio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {establecimientosData.map((r, i) => (
                          <tr key={i}>
                            <td>{r.fecha}</td>
                            <td>{r.establecimiento}</td>
                            <td>{r.horario}</td>
                            <td>{r.municipio}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <hr />

                <section id="elegibilidad" className="rules-section">
                  <h2>Requisitos de participación</h2>
                  <ul>
                    <li>Residentes de Puerto Rico, 18 años o más.</li>
                    <li>Se requiere subir recibo o participar por correo sin compra.</li>
                    <li>Una participación por recibo.</li>
                  </ul>
                </section>

                <hr />

                <section id="mecanica" className="rules-section">
                  <h2>Mecánica / Participación sin compra</h2>
                  <p>
                    Para participar sin compra se debe enviar nombre, dirección y teléfono por correo regular antes de la fecha límite.
                  </p>
                </section>

                <hr />

                <section id="premios" className="rules-section">
                  <h2>Premios y selección de ganadores</h2>
                  <div className="overflow-x-auto">
                    <table className="rules-table">
                      <thead>
                        <tr>
                          <th>Premio</th>
                          <th>Cantidad</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {premiosData.map((r, i) => (
                          <tr key={i}>
                            <td>{r.premio}</td>
                            <td>{r.cantidad}</td>
                            <td>{r.valor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3">
                    El sorteo se realizará al azar ante Notario Público. Un participante no puede ganar más de una vez.
                  </p>
                </section>

                <hr />

                <section id="notificacion" className="rules-section">
                  <h2>Notificación y entrega de premios</h2>
                  <p>
                    Los ganadores serán notificados en un plazo no mayor de cinco (5) días hábiles luego del sorteo y tendrán
                    siete (7) días desde la notificación para someter evidencia de identidad según se requiera.
                  </p>
                </section>

                <hr />

                <section id="responsabilidad" className="rules-section">
                  <h2>Limitaciones y responsabilidades</h2>
                  <ul>
                    <li>El organizador no asume responsabilidad por problemas técnicos que impidan la participación.</li>
                    <li>No se asume responsabilidad por información incompleta, incorrecta o no legible provista por los participantes.</li>
                  </ul>
                </section>

                <hr />

                <section id="transparencia" className="rules-section">
                  <h2>Transparencia y legalidad</h2>
                  <ul>
                    <li>Concurso promocional que no requiere compra para participar.</li>
                    <li>La participación implica aceptación íntegra de estas reglas.</li>
                    <li>Se mantendrá récord de sorteos conforme a la Regla 13 del Reglamento sobre Sorteos (DACO).</li>
                    <li>Exclusiones de elegibilidad aplican a empleados/afiliados del organizador y administrador.</li>
                  </ul>
                </section>

                <hr />

                <section id="contacto" className="rules-section">
                  <h2>Contacto</h2>
                  <p>
                    Dudas o reclamaciones por escrito a:
                    <br />
                    <strong>Loud And Live Puerto Rico Inc.</strong>, 255 Calle Matadero, City Outlets Park STE 6, San Juan, PR 00918.
                  </p>
                </section>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}