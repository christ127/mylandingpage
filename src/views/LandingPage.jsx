// src/views/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/buttons.css";
import "../styles/footer.css";

// Static asset imports — Vite resolves these at build time, no BASE_URL issues
import alpoLogo from "../assets/alpo-logo.png";
import dogBruno from "../assets/dog-bruno.png";
import dogMolly from "../assets/dog-molly.png";
import heroePortrait from "../assets/heroe-portrait.jpg";

/* ── Brand helpers ──────────────────────────────────────────────────────── */
const B = {
  red: "var(--color-brand-red)",
  burgundy: "var(--color-brand-burgundy)",
  deepRed: "var(--color-brand-deep-red)",
  yellow: "var(--color-brand-yellow)",
  amber: "var(--color-brand-amber)",
  tan: "var(--color-brand-tan)",
  white: "var(--color-brand-white)",
  black: "var(--color-brand-black)",
};

/* ── Decorative kibble dots ─────────────────────────────────────────────── */
const KIBBLES = [
  { top: "6%", left: "1%", size: 13 },
  { top: "18%", left: "5%", size: 9 },
  { top: "2%", left: "25%", size: 11 },
  { top: "30%", left: "0.5%", size: 15 },
  { top: "55%", left: "2%", size: 10 },
  { top: "78%", left: "7%", size: 12 },
  { top: "4%", right: "12%", size: 13 },
  { top: "20%", right: "4%", size: 10 },
  { top: "48%", right: "1%", size: 14 },
  { top: "72%", right: "5%", size: 11 },
  { top: "88%", right: "10%", size: 9 },
];

/* ── Dog stories ────────────────────────────────────────────────────────── */
const DOG_STORIES = [
  { name: "Bruno", img: dogBruno, accent: "#E9C46A" },
  { name: "Molly", img: dogMolly, accent: "#F4A261" },
];

/* ── Icons ──────────────────────────────────────────────────────────────── */
function CameraIcon() {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: B.red }}>
      {/* ══ HERO ═════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(130% 90% at 65% 35%, ${B.red} 0%, ${B.burgundy} 50%, ${B.deepRed} 100%)`,
        }}
      >
        {/* Kibble dots */}
        {KIBBLES.map((k, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute rounded-full opacity-50 pointer-events-none"
            style={{
              top: k.top,
              left: k.left ?? undefined,
              right: k.right ?? undefined,
              width: k.size,
              height: k.size,
              background: B.amber,
            }}
          />
        ))}

        <div
          className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-14 md:py-16
                        grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
        >
          {/* ── Left column ── */}
          <div className="flex flex-col gap-5">
            {/* Heading */}
            <div className="leading-none">
              <p
                className="font-black uppercase text-[4.5rem] md:text-[6.5rem] leading-none tracking-tight drop-shadow-lg"
                style={{ color: B.white, fontFamily: "'Antihero', sans-serif" }}
              >
                MI
              </p>
              <p
                className="font-black uppercase text-[4.5rem] md:text-[6.5rem] leading-none tracking-tight drop-shadow-lg"
                style={{ color: B.white, fontFamily: "'Antihero', sans-serif" }}
              >
                H<span style={{ position: "relative", display: "inline-block" }}>
                  E
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-0.32em",
                      left: "70%",
                      transform: "translateX(-50%) rotate(20deg)",
                      fontFamily: "'Antihero', sans-serif",
                      fontWeight: "normal",
                      fontSize: "0.30em",
                      lineHeight: 1,
                      color: B.white,
                      pointerEvents: "none",
                    }}
                  >
                    /
                  </span>
                </span>ROE
              </p>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-white text-xl md:text-3xl font-semibold italic">
                  se <span style={{ color: B.yellow }}>alimenta</span> con
                </p>
                <img
                  src={alpoLogo}
                  alt="ALPO"
                  className="h-48 md:h-72 w-auto object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Tagline — mobile only */}
            <p className="lg:hidden text-white/90 text-sm leading-relaxed max-w-sm">
              <strong className="text-white">Cada semana</strong>{" "}
              seleccionaremos{" "}
              <strong className="text-white">historias reales</strong> de héroes
              del hogar que tendrán la oportunidad de protagonizar{" "}
              <strong className="text-white">anuncios espectaculares</strong>.
            </p>

            {/* Form preview card */}
            <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 w-full max-w-sm">
              <h2
                className="text-base font-black mb-4 tracking-tight"
                style={{ color: B.deepRed }}
              >
                Comparte tu historia
              </h2>

              {/* Dog name + photo upload */}
              <div className="flex gap-3 items-start mb-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-neutral-500 mb-1">
                    Nombre de tu héroe*
                  </label>
                  <input
                    type="text"
                    placeholder="Bouncer"
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm
                               text-neutral-700 bg-neutral-50 cursor-pointer"
                    readOnly
                    onClick={() => nav("/form")}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => nav("/form")}
                  className="flex-shrink-0 w-[60px] h-[60px] rounded-xl border-2 border-dashed
                             flex flex-col items-center justify-center gap-1 text-[10px] font-bold
                             transition hover:opacity-80"
                  style={{
                    borderColor: B.red,
                    color: B.red,
                    background: "#fff5f6",
                  }}
                >
                  <CameraIcon />
                  Foto
                </button>
              </div>

              {/* Story textarea */}
              <div className="mb-3">
                <label className="block text-xs font-semibold text-neutral-500 mb-1">
                  ¿Por qué es tu héroe?*
                </label>
                <textarea
                  rows={3}
                  placeholder="Bouncer es mi perro guardián, siempre fiel, divertido y valiente..."
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm
                             text-neutral-700 bg-neutral-50 resize-none cursor-pointer"
                  readOnly
                  onClick={() => nav("/form")}
                />
              </div>

              {/* Receipt upload */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-neutral-500 mb-1">
                  Sube el recibo de tu compra de{" "}
                  <span className="font-black" style={{ color: B.red }}>
                    ALPO
                  </span>
                  <span className="text-neutral-400 font-normal">
                    {" "}
                    (opcional)
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => nav("/form")}
                  className="w-full rounded-lg py-2 text-sm font-bold border-2 flex items-center
                             justify-center gap-2 transition hover:opacity-90"
                  style={{
                    borderColor: B.amber,
                    color: B.deepRed,
                    background: "rgba(232,160,32,0.1)",
                  }}
                >
                  <UploadIcon />
                  Subir recibo
                </button>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => nav("/form")}
                className="w-full rounded-full py-3 text-sm font-black uppercase tracking-widest
                           shadow-lg hover:shadow-xl hover:opacity-95 transition"
                style={{ background: B.yellow, color: B.deepRed }}
              >
                Comparte tu historia
              </button>
            </div>
          </div>

          {/* ── Right column (desktop only) ── */}
          <div className="hidden lg:flex flex-col items-center gap-6 pt-4">
            {/* Tagline */}
            <p className="text-white/90 text-base leading-relaxed max-w-xs self-start">
              <strong className="text-white">Cada semana</strong>{" "}
              seleccionaremos{" "}
              <strong className="text-white">historias reales</strong> de héroes
              del hogar que tendrán la oportunidad de protagonizar{" "}
              <strong className="text-white">anuncios espectaculares</strong>.
            </p>

            {/* Hero dog circle */}
            <div className="relative">
              <div
                className="w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden shadow-2xl border-4"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                <img
                  src={heroePortrait}
                  alt="Mi héroe"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div
                className="absolute bottom-4 right-2 px-3 py-1 rounded-full text-xs font-black
                           uppercase tracking-wide shadow-lg"
                style={{ background: B.yellow, color: B.deepRed }}
              >
                Mi héroe favorito
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ═════════════════════════════════════════════════════ */}
      <section
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 px-4 py-10"
        style={{ background: B.burgundy }}
      >
        <p className="text-white font-bold text-base sm:text-lg text-center">
          ¡<strong>Participa</strong> y grita al mundo por qué tu perro es tu
          héroe!
        </p>
        <button
          type="button"
          onClick={() => nav("/form")}
          className="participa-btn"
        >
          Comparte tu historia
        </button>
        <button
          type="button"
          onClick={() => nav("/rules")}
          className="participa-btn participa-btn--outline"
        >
          Reglas
        </button>
      </section>

      {/* ══ DOG STORIES ══════════════════════════════════════════════════ */}
      <section
        className="py-10 px-4"
        style={{ background: "rgba(0,0,0,0.18)" }}
      >
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {DOG_STORIES.map(({ name, img, accent }) => (
            <div key={name} className="flex flex-col items-center">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-xs">
                {/* Sticky-note name tag */}
                <div
                  className="px-4 py-2 font-black text-lg"
                  style={{ background: accent, color: B.deepRed }}
                >
                  {name}
                </div>

                {/* Dog photo */}
                <div
                  className="w-full aspect-square overflow-hidden"
                  style={{ background: B.burgundy }}
                >
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Name caption */}
                {/* <p className="text-center font-bold py-2 text-sm text-neutral-800">
                  {name}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Válido del 10 de abril al 10 de mayo de
            2026. Participación sin obligación de compra. Limitada a mayores de
            edad y residentes legales de Puerto Rico.{" "}
            <button
              onClick={() => nav("/rules")}
              className="footer-link underline"
            >
              Ver reglas completas
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}
