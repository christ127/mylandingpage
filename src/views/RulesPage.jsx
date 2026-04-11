import { Link } from "react-router-dom";
import "../styles/rules.css";

export default function RulesPage() {
  const sections = [
    { id: "patrocinador", title: "1. Patrocinador" },
    { id: "duracion", title: "2. Duración de la plataforma" },
    { id: "elegibilidad", title: "3. Elegibilidad" },
    { id: "participacion", title: "4. Cómo participar" },
    { id: "seleccion", title: "5. Selección de participaciones destacadas" },
    { id: "usoParticipaciones", title: "6. Uso de las participaciones" },
    { id: "derechosContenido", title: "7. Derechos de uso de contenido" },
    { id: "contenidoPermitido", title: "8. Contenido permitido" },
    { id: "responsabilidad", title: "9. Limitación de responsabilidad" },
    { id: "aceptacionReglas", title: "10. Aceptación de reglas" },
    { id: "modificaciones", title: "11. Modificaciones" },
    { id: "leyAplicable", title: "12. Ley aplicable" },
    { id: "contacto", title: "13. Información de contacto" },
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
                <section id="patrocinador" className="rules-section">
                  <h2>1. Patrocinador</h2>
                  <p>
                    "Mi héroe se alimenta con Alpo" (en adelante, la
                    "Plataforma") es organizada por{" "}
                    <strong>
                      Purina Alpo Dog Food / V. Suárez & Co., Inc.
                    </strong>
                    , distribuidor autorizado en Puerto Rico (en adelante, el
                    "Patrocinador").
                  </p>
                </section>

                <hr />

                <section id="duracion" className="rules-section">
                  <h2>2. Duración de la plataforma</h2>
                  <p>
                    La Plataforma es una comunidad digital creada para celebrar
                    a los héroes del hogar, donde los participantes podrán
                    compartir la historia de sus perros y destacar su rol en su
                    día a día. Estará vigente desde el{" "}
                    <strong>10 de abril de 2026</strong> hasta el{" "}
                    <strong>10 de mayo de 2026</strong> (en adelante, el
                    "Período de Participación"). Durante este período se
                    realizarán dos (2) selecciones semanales de las historias
                    que los participantes suben a la plataforma.
                  </p>
                </section>

                <hr />

                <section id="elegibilidad" className="rules-section">
                  <h2>3. Elegibilidad</h2>
                  <p>
                    Podrán participar personas residentes legales de Puerto
                    Rico, mayores de <strong>dieciocho (18) años</strong> al
                    momento de participar. Se requiere acceso a internet y un
                    dispositivo para completar la participación. No podrán
                    participar empleados del Patrocinador, sus afiliadas,
                    agencias de publicidad o relaciones públicas, ni sus
                    familiares inmediatos.
                  </p>
                </section>

                <hr />

                <section id="participacion" className="rules-section">
                  <h2>4. Cómo participar</h2>
                  <h3>Método con compra</h3>
                  <p>
                    El participante deberá tomar una foto de su perro, acceder a{" "}
                    <strong>miheroealpo.com</strong>, completar el formulario
                    con su nombre, nombre del perro y una breve historia
                    explicando por qué su perro es su héroe del día a día, subir
                    la foto y adjuntar evidencia válida de compra de un producto
                    Alpo.
                  </p>
                  <h3>Método sin compra</h3>
                  <p>
                    Para participar sin compra, el participante deberá acceder a{" "}
                    <strong>miheroealpo.com</strong>, completar el formulario,
                    subir la foto y la historia, e incluir una nota indicando
                    "Participación sin compra". Las participaciones sin compra
                    tendrán las mismas oportunidades de ser seleccionadas.
                  </p>
                </section>

                <hr />

                <section id="seleccion" className="rules-section">
                  <h2>5. Selección de participaciones destacadas</h2>
                  <p>
                    Todas las participaciones serán evaluadas por un panel
                    designado por el Patrocinador, tomando en consideración
                    criterios como creatividad, autenticidad, conexión emocional
                    y calidad del contenido. Se seleccionarán{" "}
                    <strong>
                      dos (2) participaciones destacadas por semana
                    </strong>{" "}
                    durante la vigencia de la Plataforma. Las decisiones del
                    Patrocinador serán finales.
                  </p>
                </section>

                <hr />

                <section id="usoParticipaciones" className="rules-section">
                  <h2>6. Uso de las participaciones</h2>
                  <p>
                    Las participaciones seleccionadas podrán ser usadas en
                    plataformas digitales de la marca, incluyendo redes
                    sociales, medios digitales y materiales promocionales.
                    Asimismo, podrán formar parte de ejecuciones publicitarias
                    de alto impacto, incluyendo medios exteriores (OOH) como
                    billboards y otras piezas de comunicación.
                  </p>
                  <p>
                    Este uso no conlleva compensación económica ni remuneración
                    de ningún tipo, ni para el participante ni para su mascota.
                  </p>
                </section>

                <hr />

                <section id="derechosContenido" className="rules-section">
                  <h2>7. Derechos de uso de contenido</h2>
                  <p>
                    Al participar, el participante declara que es titular de los
                    derechos sobre el contenido enviado y autoriza al
                    Patrocinador, sin compensación alguna, a utilizar,
                    reproducir, adaptar y publicar la foto, el nombre del perro
                    y el testimonio en cualquier medio, incluyendo publicidad,
                    redes sociales y medios exteriores. El participante
                    garantiza que el contenido no infringe derechos de terceros.
                  </p>
                </section>

                <hr />

                <section id="contenidoPermitido" className="rules-section">
                  <h2>8. Contenido permitido</h2>
                  <p>
                    El Patrocinador se reserva el derecho de descalificar
                    cualquier participación que contenga material ofensivo,
                    inapropiado o ilegal, o que infrinja derechos de terceros o
                    incumpla con estas reglas.
                  </p>
                </section>

                <hr />

                <section id="responsabilidad" className="rules-section">
                  <h2>9. Limitación de responsabilidad</h2>
                  <p>
                    El Patrocinador no será responsable por fallas técnicas,
                    errores de transmisión, problemas de conectividad, ni por
                    participaciones incompletas, tardías o no recibidas, ni por
                    cualquier daño o pérdida relacionada con la participación en
                    la Plataforma.
                  </p>
                </section>

                <hr />

                <section id="aceptacionReglas" className="rules-section">
                  <h2>10. Aceptación de reglas</h2>
                  <p>
                    La participación en esta Plataforma constituye la aceptación
                    total de estas reglas.
                  </p>
                </section>

                <hr />

                <section id="modificaciones" className="rules-section">
                  <h2>11. Modificaciones</h2>
                  <p>
                    El Patrocinador se reserva el derecho de modificar,
                    suspender o cancelar la Plataforma en caso de circunstancias
                    fuera de su control.
                  </p>
                </section>

                <hr />

                <section id="leyAplicable" className="rules-section">
                  <h2>12. Ley aplicable</h2>
                  <p>
                    Esta Plataforma se regirá por las leyes del Estado Libre
                    Asociado de Puerto Rico.
                  </p>
                </section>

                <hr />

                <section id="contacto" className="rules-section">
                  <h2>13. Información de contacto</h2>
                  <p>
                    Para dudas o información adicional, los participantes pueden
                    comunicarse a:{" "}
                    <a
                      href="mailto:ltirado@loudlive.com"
                      className="link-green link-underline-yellow"
                    >
                      ltirado@loudlive.com
                    </a>{" "}
                    &{" "}
                    <a
                      href="mailto:yaretsie.cruz@vsuarez.com"
                      className="link-green link-underline-yellow"
                    >
                      yaretsie.cruz@vsuarez.com
                    </a>
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
