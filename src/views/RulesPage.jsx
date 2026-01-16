import { Link } from "react-router-dom";
import "../styles/rules.css";

// const establecimientosData = [
//   { fecha: "01.NOV.2025", establecimiento: "Pueblo Río Hondo", horario: "11:00 AM – 2:00 PM", municipio: "Bayamón" },

//   { fecha: "02.NOV.2025", establecimiento: "Supermax San Francisco", horario: "11:00 AM – 2:00 PM", municipio: "San Juan" },
//   { fecha: "02.NOV.2025", establecimiento: "Econo Levittown", horario: "11:00 AM – 2:00 PM", municipio: "Bayamón" },

//   { fecha: "04.NOV.2025", establecimiento: "Ralph's Río Grande", horario: "3:00 PM – 7:00 PM", municipio: "Rio Grande" },

//   { fecha: "07.NOV.2025", establecimiento: "Econo Condado Moderno", horario: "3:00 PM – 6:00 PM", municipio: "Caguas" },
//   { fecha: "07.NOV.2025", establecimiento: "Selectos Guaynabo", horario: "2:00 PM – 5:00 PM", municipio: "Guaynabo" },

//   { fecha: "08.NOV.2025", establecimiento: "Selectos Los Prados", horario: "11:00 AM – 2:00 PM", municipio: "Caguas" },
//   { fecha: "08.NOV.2025", establecimiento: "Supermax Caparra", horario: "11:00 AM – 2:00 PM", municipio: "San Juan" },

//   { fecha: "09.NOV.2025", establecimiento: "Walgreens Caguas", horario: "11:00 AM – 2:00 PM", municipio: "Caguas" },
//   { fecha: "09.NOV.2025", establecimiento: "Amigo Plaza Guaynabo", horario: "11:00 AM – 2:00 PM", municipio: "Guaynabo" },

//   { fecha: "13.NOV.2025", establecimiento: "Walgreens Plaza Las Américas", horario: "2:00 PM – 5:00 PM", municipio: "San Juan" },
//   { fecha: "13.NOV.2025", establecimiento: "Ralph's Montehiedra", horario: "2:00 PM – 5:00 PM", municipio: "San Juan" },

//   { fecha: "14.NOV.2025", establecimiento: "Pueblo Plaza Las Américas", horario: "11:00 AM – 2:00 PM", municipio: "San Juan" },
//   { fecha: "14.NOV.2025", establecimiento: "Econo Plaza Carolina", horario: "11:00 AM – 2:00 PM", municipio: "Carolina" },

//   { fecha: "15.NOV.2025", establecimiento: "Ralph’s Montehiedra", horario: "11:00 AM – 2:00 PM", municipio: "San Juan" },
//   { fecha: "15.NOV.2025", establecimiento: "Supermax De Diego", horario: "11:00 AM – 2:00 PM", municipio: "San Juan" },

//   { fecha: "21.NOV.2025", establecimiento: "Supermax Los Filtros", horario: "12:00 PM – 3:00 PM", municipio: "Bayamón" },
//   { fecha: "21.NOV.2025", establecimiento: "Supermax Guaynabo", horario: "12:00 PM – 3:00 PM", municipio: "Guaynabo" },

//   { fecha: "22.NOV.2025", establecimiento: "Selectos Levittown", horario: "12:00 PM – 3:00 PM", municipio: "Bayamón" },
//   { fecha: "22.NOV.2025", establecimiento: "Walgreens Isla Verde", horario: "12:00 PM – 3:00 PM", municipio: "Carolina" },

//   { fecha: "04.DEC.2025", establecimiento: "Walgreens San Patricio", horario: "12:00 PM – 3:00 PM", municipio: "San Juan" },
//   { fecha: "04.DEC.2025", establecimiento: "Pueblo Montemall", horario: "2:00 PM – 5:00 PM", municipio: "San Juan" },

//   { fecha: "05.DEC.2025", establecimiento: "Econo Altamira", horario: "2:00 PM – 5:00 PM", municipio: "San Juan" },
//   { fecha: "05.DEC.2025", establecimiento: "Pueblo Señorial", horario: "2:00 PM – 5:00 PM", municipio: "San Juan" },

//   { fecha: "13.DEC.2025", establecimiento: "Mr. Special Mayagüez Balboa", horario: "10:00 AM – 1:00 PM", municipio: "Mayagüez" },

//   { fecha: "14.DEC.2025", establecimiento: "Mr. Special Cabo Rojo", horario: "10:00 AM – 1:00 PM", municipio: "Cabo Rojo" },

//   { fecha: "20.DEC.2025", establecimiento: "Pueblo Isla Verde", horario: "11:00 AM – 2:00 PM", municipio: "Carolina" }
// ];

// const premiosData = [
//   { premio: "Premio de efectivo", cantidad: 1, valor: "$500" },
//   { premio: "Premios de efectivo", cantidad: 4, valor: "$100" },
// ];

export default function RulesPage() {
  const sections = [
    { id: "organizador", title: "Organizador" },
    { id: "duracion", title: "Duración" },
    { id: "productos", title: "Productos participantes" },
    // { id: "elegibilidad", title: "Requisitos de participación" },
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
                <section id="organizador" className="rules-section">
                  <h2>Organizador</h2>
                  <p>
                    Este concurso es organizado por{" "}
                    <strong>V. Suárez Inc. </strong>y administrado por{" "}
                    <strong>Loud And Live Puerto Rico Inc.</strong>
                  </p>
                </section>

                <hr />

                <section id="duracion" className="rules-section">
                  <h2>Duración</h2>
                  <p>
                    Este concurso comienza el 15 de enero y finaliza el 19 de
                    febrero de 2026 a las 12:00 am. La selección de los
                    ganadores se llevará a cabo mediante sorteo el 23 de febrero
                    de 2026.
                  </p>
                </section>

                <hr />

                <section id="productos" className="rules-section">
                  <h2>Productos participantes</h2>
                  <ul>
                    <li>Wish-Bone Thosand Island bottle </li>
                    <li>Wish-Bone Chunky Blue Cheese bottle</li>
                    <li>Wish-Bone Creamy French bottle</li>
                    <li>Wish-Bone Ranch bottle</li>
                    <li>Wish-Bone Ranch bottle</li>
                  </ul>
                </section>

                <hr />

                {/* <section id="establecimientos" className="rules-section">
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
                </section> */}

                <hr />

                <section id="elegibilidad" className="rules-section">
                  <h2>Requisitos de participación</h2>
                  <ul>
                    <li>
                      Solamente podrán participar residentes bona fide
                      (legales)de Puerto Rico y que a la fecha de la
                      participación tengan 18 años o más;
                    </li>
                    <li>
                      Para participar, el concursante deberá subir una foto o
                      imagen del recibo de compra de 2 productos o más de la
                      marca Wish-Bone antes indicados o facsímiles razonables.
                      No se requiere compra para participar;
                    </li>
                    <li>
                      La participación será confirmada una vez recibida por el
                      administrador;
                    </li>
                    <li>
                      Cada participante podrá registrar una sola participación
                      por recibo;
                    </li>
                    <li>
                      Cada persona podrá participar más de una vez siempre y
                      cuando cumpla con los requisitos de participación.
                    </li>
                  </ul>
                </section>

                <hr />

                <section id="mecanica" className="rules-section">
                  <h2>Participación por Correo y Graituita Alterna</h2>
                  <ul>
                    <li>
                      Las personas que cumplan con los requisitos de
                      participación podrán hacerlo también por correo. Para
                      ello, deberán enviar el recibo de compra para que sea
                      recibido en o antes del 19 de febrero de 2026 a la media
                      noche, con su nombre completo, dirección y número de
                      teléfono a la siguiente dirección:
                    </li>
                    {/* #255 Calle Matadero
                      City Outlet Park STE 6
                      San Juan PR, 00920
                      */}
                    <li>
                      Para participar sin compra y de manera gratuita, el
                      participante deberá enviar por correo, para que sea
                      recibido en o antes de 19 de febrero a la media noche, un
                      papel con su nombre, dirección y número de teléfono a la
                      dirección antes indicada;
                    </li>
                    <li>
                      Solo se permitirá una participación gratuita por persona.
                      Es un requisito esencial que toda la información
                      solicitada sea legible y esté completa para participar. De
                      lo contrario, la participación quedará automáticamente
                      descalificada.
                    </li>
                  </ul>
                </section>

                <hr />

                <section id="premios" className="rules-section">
                  <h2>Premios y Selección de Ganadores</h2>

                  <p>
                    <strong>Premios.</strong> Los premios consistirán en:{" "}
                    <strong>(2)</strong> BBQ marca Webber con cover para
                    almacenaje; <strong>(3)</strong> Air Fryer marca Ninja; y{" "}
                    <strong>(5)</strong> Bullet Blender marca Nutribullet.
                  </p>

                  <p>
                    <strong>Elegibilidad.</strong> Todas las participaciones
                    válidas recibidas durante el periodo del concurso serán
                    elegibles para el sorteo.
                  </p>

                  <p>
                    <strong>Restricciones.</strong> Los premios{" "}
                    <strong>no son transferibles</strong> ni canjeables por
                    dinero en efectivo, ni por ningún otro producto y/o
                    servicio.
                  </p>

                  <p>
                    <strong>Selección.</strong> Se seleccionará{" "}
                    <strong>un (1) ganador</strong> y{" "}
                    <strong>dos (2) ganadores alternos</strong> para cada uno de
                    los premios antes indicados.
                  </p>

                  <p>
                    <strong>Sorteo.</strong> Los ganadores se seleccionarán al
                    azar mediante sorteo en las oficinas del administrador del
                    concurso el <strong>23 de febrero de 2026</strong>.
                  </p>

                  <p>
                    <strong>Limitación de ganadores.</strong> Ningún ganador ni
                    ganador alterno podrá resultar ganador en más de una (1)
                    ocasión.
                  </p>

                  <p>
                    <strong>Probabilidades.</strong> Cada participación válida
                    tendrá igual probabilidad de resultar ganadora. La
                    probabilidad de ganar dependerá de la cantidad total de
                    participaciones recibidas.
                  </p>

                  <p>
                    <strong>Registro.</strong> Los sorteos y sus ganadores
                    quedarán documentados en el expediente del administrador de
                    conformidad con la <strong>Regla 13</strong> del Reglamento
                    Sobre Sorteos promulgado por el Departamento de Asuntos al
                    Consumidor (<strong>DACO</strong>).
                  </p>
                </section>

                <hr />

                <section id="notificacion" className="rules-section">
                  <h2>Notificación y Entrega de Premios</h2>

                  <p>
                    <strong>Notificación.</strong> Los ganadores serán
                    notificados en un plazo no mayor de{" "}
                    <strong>cinco (5) días hábiles</strong> luego del sorteo del{" "}
                    <strong>23 de febrero de 2026</strong>. La notificación
                    podrá efectuarse mediante correo certificado con acuse de
                    recibo, correo electrónico, teléfono, o cualquiera de los
                    anteriores.
                  </p>

                  <p>
                    <strong>Documentos de identidad.</strong> Los ganadores
                    tendrán un periodo de <strong>siete (7) días</strong> desde
                    que reciban la notificación del administrador para someter,
                    mediante el mecanismo requerido, los documentos
                    acreditativos de su identidad.
                  </p>

                  <p>
                    <strong>Divulgación.</strong> No se publicarán los nombres
                    de los ganadores hasta el envío de la notificación oficial
                    por parte del administrador.
                  </p>

                  <p>
                    <strong>Descalificación.</strong> Si (i) no se logra
                    efectuar la notificación, (ii) no se puede comprobar la
                    identidad, (iii) no se acredita que el ganador cumple con
                    los requisitos de participación, o (iv) transcurre el
                    término de <strong>siete (7) días</strong> desde la
                    notificación oficial sin respuesta, el ganador se entenderá
                    descalificado y no podrá reclamar su premio posteriormente.
                  </p>

                  <p>
                    <strong>Ganador alterno.</strong> En tal caso, se efectuará
                    la notificación oficial al ganador alterno bajo los mismos
                    términos y condiciones aquí establecidos.
                  </p>
                </section>

                <hr />

                <section id="responsabilidad" className="rules-section">
                  <h2>Responsabilidad</h2>

                  <p>
                    <strong>Aspectos técnicos.</strong> El organizador no asume
                    responsabilidad alguna por problemas y/o situaciones
                    técnicas que impidan la participación de los concursantes,
                    incluyendo fallas en la comunicación de internet o cualquier
                    otro mecanismo que se determine será utilizado, y que pueda
                    impedir de forma efectiva la participación.
                  </p>

                  <p>
                    <strong>Información provista por participantes.</strong> Ni
                    el organizador ni el administrador asumen responsabilidad
                    por nombres, direcciones, teléfonos y/o cualquier otra
                    información provista por los participantes que resulte
                    incompleta, incorrecta o no legible.
                  </p>
                </section>

                <hr />

                <section id="transparencia" className="rules-section">
                  <h2>Transparencia y Legalidad</h2>

                  <p>
                    <strong>Naturaleza del concurso.</strong> Este concurso es
                    un sorteo promocional que{" "}
                    <strong>NO requiere compra</strong> para participar.
                  </p>

                  <p>
                    <strong>Aceptación de reglas.</strong> La participación
                    implica la aceptación íntegra de estas reglas.
                  </p>

                  <p>
                    <strong>Récord de sorteos.</strong> El organizador mantendrá
                    un “récord” sobre los sorteos efectuados de conformidad con
                    la <strong>Regla 13</strong> del Reglamento Sobre Sorteos
                    promulgado por el Departamento de Asuntos al Consumidor (
                    <strong>DACO</strong>), luego de concluido el presente
                    concurso.
                  </p>

                  <p>
                    <strong>Limitación de responsabilidad.</strong> El
                    organizador ni ninguna de sus empresas y/o agencias de
                    publicidad asumen responsabilidad alguna, expresa o tácita,
                    frente a los participantes, distinta a garantizar su
                    participación siempre y cuando estos cumplan íntegramente
                    con las reglas del concurso.
                  </p>

                  <p>
                    <strong>Exclusiones.</strong> Podrán participar todas
                    aquellas personas que cumplan con los Requisitos de
                    Participación, excepto aquellas que sean empleados o
                    familiares de la empresa <strong>V. Suárez Inc.</strong> y{" "}
                    <strong>Loud And Live</strong>, sus subsidiarias, agencias
                    publicitarias o el administrador del presente concurso.
                  </p>
                </section>

                <hr />

                <section id="contacto" className="rules-section">
                  <h2>Contacto</h2>
                  <p>
                    Dudas o reclamaciones por escrito a:
                    <br />
                    <strong>Loud And Live Puerto Rico Inc.</strong>, 255 Calle
                    Matadero, City Outlets Park STE 6, San Juan, PR 00918.
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
