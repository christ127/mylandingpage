import { Link } from "react-router-dom";
import "../styles/rules.css";

// const premiosData = [
//   { premio: "Premio de efectivo", cantidad: 1, valor: "$500" },
//   { premio: "Premios de efectivo", cantidad: 4, valor: "$100" },
// ];

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
                    Este concurso comienza el <strong>15 de enero</strong> y
                    finaliza el <strong>19 de febrero de 2026</strong> a las
                    12:00 am. La selección de los ganadores se llevará a cabo
                    mediante sorteo el <strong>23 de febrero de 2026</strong>.
                  </p>
                </section>

                <hr />

                <section id="productos" className="rules-section">
                  <h2>Productos participantes</h2>
                  <ul>
                    <li>Wish-Bone Thosand Island bottle</li>
                    <li>Wish-Bone Chunky Blue Cheese bottle</li>
                    <li>Wish-Bone Creamy French bottle</li>
                    <li>Wish-Bone Ranch bottle</li>
                    <li>Wish-Bone Ranch bottle</li>
                  </ul>
                </section>

                <hr />

                <section id="elegibilidad" className="rules-section">
                  <h2>Requisitos de participación</h2>
                  <ul>
                    <li>
                      Solamente podrán participar residentes bona fide (legales)
                      de Puerto Rico y que a la fecha de la participación tengan
                      18 años o más;
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
                  <h2>Participación por Correo y Gratuita Alterna</h2>

                  <ul>
                    <li>
                      Las personas que cumplan con los requisitos de
                      participación podrán hacerlo también por correo. Para
                      ello, deberán enviar el recibo de compra para que sea
                      recibido en o antes del
                      <strong> 19 de febrero de 2026 a la media noche</strong>,
                      con su nombre completo, dirección y número de teléfono a
                      la siguiente dirección:
                    </li>

                    <li className="list-none mt-2 mb-2">
                      <strong>
                        #255 Calle Matadero
                        <br />
                        City Outlet Park STE 6
                        <br />
                        San Juan PR, 00920
                      </strong>
                    </li>

                    <li>
                      Para participar sin compra y de manera gratuita, el
                      participante deberá enviar por correo, para que sea
                      recibido en o antes del 19 de febrero a la media noche, un
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

                {/* UPDATED SECTION */}
                <section id="premios" className="rules-section">
                  <h2>Premios y Selección de Ganadores</h2>
                  <ul>
                    <li>
                      Los premios consistirán en un{" "}
                      <strong>
                        (2) BBQ marca Webber con cover para almacenaje;
                      </strong>{" "}
                      un <strong>(3) Air Fryer marca Ninja</strong> y un{" "}
                      <strong>(5) Bullet Blender marca Nutribullet;</strong>
                    </li>
                    <li>
                      Todas las participaciones válidas recibidas durante el
                      periodo del concurso serán elegibles para participar;
                    </li>
                    <li>
                      Los premios otorgados en el presente concurso no son
                      transferibles ni canjeables por ningún otro producto y/o
                      servicio.
                    </li>
                    <li>
                      Se seleccionará un ganador y dos ganadores alternos para
                      cada uno de los premios antes indicados;
                    </li>
                    <li>
                      Los ganadores se seleccionarán al azar mediante sorteo en
                      las oficinas del administrador del concurso el 23 de
                      febrero de 2026;
                    </li>
                    <li>
                      Ningún ganador ni ganador alterno podrá resultar ganador
                      en más de una ocasión.
                    </li>
                    <li>
                      Cada participación válida tendrá igual probabilidad de
                      resultar ganadora. La probabilidad de ganar dependerá de
                      la cantidad de participaciones recibidas;
                    </li>
                    <li>
                      Los sorteos y sus ganadores quedarán documentados en el
                      expediente del administrador de conformidad a la Regla 13
                      del Reglamento Sobre Sorteos promulgado por el
                      Departamento de Asuntos al Consumidor, DACO por sus
                      siglas.
                    </li>
                  </ul>
                </section>

                <hr />

                {/* UPDATED SECTION */}
                <section id="notificacion" className="rules-section">
                  <h2>Notificación y Entrega de Premios</h2>
                  <ul>
                    <li>
                      Los ganadores serán notificados en un plazo no mayor de
                      cinco (5) días hábiles luego del sorteo del 23 de febrero
                      de 2026. Esta notificación se efectuará mediante correo
                      certificado con acuse de recibo, correo electrónico de los
                      participantes, teléfono, o todas las anteriores;
                    </li>
                    <li>
                      Los ganadores tendrán un periodo de siete (7) días desde
                      que reciba la notificación por parte del administrador del
                      concurso para someter mediante el mecanismo que sea
                      requerido los documentos acreditativos de su identidad;
                    </li>
                    <li>
                      No se publicarán los nombres de los ganadores hasta el
                      envío de la notificación oficial por parte del
                      administrador;
                    </li>
                    <li>
                      Si no se logra efectuar la notificación a los que han
                      resultado ganadores, no se pudo comprobar su identidad,
                      que los mismos cumplan con los requisitos de participación
                      o si transcurre el término de siete (7) días desde la
                      notificación oficial sin recibir respuesta alguna por
                      parte de los ganadores, estos se entenderán descalificados
                      y no podrán reclamar su premio posteriormente;
                    </li>
                    <li>
                      Ante tal evento, se efectuará la notificación oficial al
                      ganador alterno con los mismos términos y condiciones
                      antes indicados;
                    </li>
                  </ul>
                </section>

                <hr />

                {/* UPDATED SECTION */}
                <section id="responsabilidad" className="rules-section">
                  <h2>Responsabilidad</h2>
                  <ul>
                    <li>
                      El organizador no asume responsabilidad alguna por
                      problemas y/o situaciones técnicas que impidan la
                      participación de los concursantes. Es decir, no se hace
                      responsable de fallas en la comunicación de internet o
                      cualquier otro mecanismo que se determine será utilizado
                      el cual pueda impedir de forma efectiva la participación
                      de los concursantes;
                    </li>
                    <li>
                      Tampoco ni el organizador ni el administrador del presente
                      concurso asumen responsabilidad alguna por nombres,
                      direcciones, teléfonos y/o cualquier otra información
                      provista por los participantes que resulte incompleta,
                      incorrecta o no legible.
                    </li>
                  </ul>
                </section>

                <hr />

                {/* UPDATED SECTION */}
                <section id="transparencia" className="rules-section">
                  <h2>Transparencia y Legalidad</h2>
                  <ul>
                    <li>
                      Este concurso es un sorteo promocional el cual{" "}
                      <strong>NO</strong> requiere compra para participar;
                    </li>
                    <li>
                      La participación implica la aceptación integra de estas
                      reglas;
                    </li>
                    <li>
                      El organizador mantendrá un “récord” sobre los sorteos
                      efectuados de conformidad a la Regla 13 del Reglamento
                      Sobre Sorteos promulgado por el Departamento de Asuntos al
                      Consumidor, DACO por sus siglas luego de concluido el
                      presente concurso;
                    </li>
                    <li>
                      El organizador ni ninguna de sus empresas y/o agencias de
                      publicidad asumen responsabilidad alguna, expresa o tácita
                      frente a los participantes otra que no sea garantizar la
                      participación de estos en el concurso siempre y cuando
                      estos cumplan, de forma íntegra, con las reglas del mismo.
                    </li>
                    <li>
                      En este concurso podrán participar todas aquellas personas
                      que cumplan con los{" "}
                      <strong>Requisitos de Participación, excepto</strong>{" "}
                      aquellas que sean empleados o familiares de la empresa V.
                      Suárez Inc. y Loud And Live sus subsidiarias, agencias
                      publicitarias o el administrador del presente concurso;
                    </li>
                  </ul>
                </section>

                <hr />

                {/* UPDATED SECTION */}
                <section id="contacto" className="rules-section">
                  <h2>Contacto</h2>
                  <p>
                    Cualquier pregunta, reclamación o petición de reglas y/o
                    lista de ganadores debe ser dirigida, por escrito a la
                    siguiente dirección:
                    <br />
                    <br />
                    <strong>“Fanáticos del Sabor Wish-Bone”</strong>
                    <br />
                    <br />
                    San Juan, Puerto Rico 00
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
