// src/views/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/buttons.css";

import StickyBanner from "../components/StickyBanner";

/* ── Brand helpers ──────────────────────────────────────────────────────── */
const B = {
  red: "var(--color-brand-red)",
  burgundy: "var(--color-brand-burgundy)",
  deepRed: "var(--color-brand-deep-red)",
  white: "var(--color-brand-white)",
  black: "var(--color-brand-black)",
};

/* ════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex flex-col pb-16 sm:pb-20" style={{ background: B.black }}>
      {/* ══ HERO BANNER ══════════════════════════════════════════════════ */}
      <StickyBanner
        desktopImage={`${import.meta.env.BASE_URL}energizer-banner-desktop.jpg`}
        mobileImage={`${import.meta.env.BASE_URL}energizer-banner-mobile.jpg`}
        alt="Prepárate y Gana con Energizer"
      />

      {/* ══ FLOATING CTA BAR ═════════════════════════════════════════════ */}
      <section
        className="fixed inset-x-0 bottom-0 z-50 h-16 sm:h-20 w-full flex items-center
                   justify-center gap-3 sm:gap-4 px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.35)]"
        style={{ background: B.red }}
      >
        <p className="hidden md:block text-white font-bold text-sm lg:text-base text-center">
          ¡<strong>Participa</strong> y gana un generador inverter de 4,800W!
        </p>
        <button type="button" onClick={() => nav("/form")} className="cta-float-btn">
          Sube tu recibo
        </button>
        <button
          type="button"
          onClick={() => nav("/rules")}
          className="cta-float-btn cta-float-btn--outline"
        >
          Reglas
        </button>
      </section>
    </div>
  );
}
