// src/views/EventPhotosPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/buttons.css";
import "../styles/footer.css";

// ── Brand helpers (same as LandingPage) ─────────────────────────────────────
const B = {
  red:      "var(--color-brand-red)",
  burgundy: "var(--color-brand-burgundy)",
  deepRed:  "var(--color-brand-deep-red)",
  yellow:   "var(--color-brand-yellow)",
  amber:    "var(--color-brand-amber)",
  tan:      "var(--color-brand-tan)",
  white:    "var(--color-brand-white)",
  black:    "var(--color-brand-black)",
};

// ── Event title — update this for each event ─────────────────────────────────
const EVENT_TITLE = "Bark & Play";

// ── Decorative kibble dots (same as LandingPage) ─────────────────────────────
const KIBBLES = [
  { top: "4%",  left: "1%",   size: 13 },
  { top: "15%", left: "4%",   size: 9  },
  { top: "2%",  left: "22%",  size: 11 },
  { top: "45%", left: "0.5%", size: 15 },
  { top: "70%", left: "3%",   size: 10 },
  { top: "3%",  right: "10%", size: 13 },
  { top: "25%", right: "3%",  size: 10 },
  { top: "55%", right: "1%",  size: 14 },
  { top: "80%", right: "6%",  size: 11 },
];

// ── Glob: auto-picks every image in src/assets/event-photos/ ─────────────────
// Just drop a .jpg / .jpeg / .png / .webp / .gif / .avif there and rebuild.
const modules = import.meta.glob(
  "../assets/event-photos/*.{jpg,jpeg,png,webp,gif,avif}",
  { eager: true }
);
const PHOTOS = Object.values(modules).map((m) => m.default);

// ────────────────────────────────────────────────────────────────────────────
export default function EventPhotosPage() {
  const nav = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `radial-gradient(130% 90% at 65% 35%, ${B.red} 0%, ${B.burgundy} 50%, ${B.deepRed} 100%)`,
      }}
    >
      {/* ── Kibble dots ── */}
      {KIBBLES.map((k, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="fixed rounded-full opacity-30 pointer-events-none"
          style={{
            top:    k.top,
            left:   k.left  ?? undefined,
            right:  k.right ?? undefined,
            width:  k.size,
            height: k.size,
            background: B.amber,
          }}
        />
      ))}

      {/* ── Back button ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 pt-6">
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-1 text-white/70 hover:text-white transition text-sm font-semibold"
        >
          <svg
            width="16" height="16" fill="none" stroke="currentColor"
            strokeWidth="2.5" viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Regresar
        </button>
      </div>

      {/* ── Title ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 pt-8 pb-6 text-center">
        <h1
          className="font-black uppercase leading-none tracking-tight drop-shadow-lg
                     text-5xl md:text-7xl"
          style={{
            color:      B.yellow,
            fontFamily: "'Antihero', sans-serif",
          }}
        >
          {EVENT_TITLE}
        </h1>
        {/* Decorative underline */}
        <div
          className="mt-4 mx-auto rounded-full opacity-60"
          style={{ width: 64, height: 4, background: B.yellow }}
        />
      </div>

      {/* ── Photo grid ── */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 pb-16">
        {PHOTOS.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg
              width="56" height="56" fill="none" stroke="currentColor"
              strokeWidth="1.5" viewBox="0 0 24 24"
              className="opacity-40 text-white"
            >
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <p
              className="text-lg font-black uppercase tracking-wide"
              style={{ color: B.yellow, fontFamily: "'Antihero', sans-serif" }}
            >
              Próximamente
            </p>
            <p className="text-white/50 text-sm text-center max-w-xs">
              Agrega fotos a{" "}
              <code
                className="rounded px-1 py-0.5 text-xs"
                style={{ background: "rgba(255,255,255,0.1)", color: B.amber }}
              >
                src/assets/event-photos/
              </code>{" "}
              y aparecerán aquí al compilar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {PHOTOS.map((src, i) => (
              <a
                key={i}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden shadow-xl
                           hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200"
                style={{ border: "2px solid rgba(255,255,255,0.1)" }}
              >
                <img
                  src={src}
                  alt={`Foto del evento ${i + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Válido del 10 de abril al 10 de mayo de 2026.
            Participación sin obligación de compra. Limitada a mayores de edad y residentes
            legales de Puerto Rico.{" "}
            <button onClick={() => nav("/rules")} className="footer-link underline">
              Ver reglas completas
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}
