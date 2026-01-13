import React from "react";
import { useNavigate } from "react-router-dom";
import StickyBanner from "../components/StickyBanner";
import VisitSchedule from "../components/VisitSchedule";

import "../styles/buttons.css";
import "../styles/footer.css";
import "../styles/schedule.css";

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#F7F5E7] flex flex-col overflow-hidden">
      {/* Banner */}
      <section className="banner-wrap">
        <div className="banner-inner">
          <div className="banner-card">
            <div className="banner-accent" />
            <div className="banner-overlay" />
            <StickyBanner
              desktopImage="/starbucks-banner.jpg"
              mobileImage="/starbucks-banner-mobile.jpg"
              minHeightPx={260}
              mobileBreakpointPx={768}
            />
          </div>
        </div>
      </section>

      {/* Schedule section */}
      <section className="schedule-wrap">
        <div className="schedule-inner">
          <div className="schedule-card">
            <div className="schedule-scrollbox">
              <VisitSchedule />
            </div>
          </div>
        </div>
      </section>

      {/* Floating buttons */}
      <main className="participa-container">
        <button
          onClick={() => nav("/form")}
          type="button"
          className="participa-btn"
        >
          Participa
        </button>

        {/* New Rules Button */}
        <button
          onClick={() => nav("/rules")}
          type="button"
          className="participa-btn"
          style={{ backgroundColor: "#2C1810" }} // Coffee brown for contrast
        >
          Reglas
        </button>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Válido del 1 de noviembre al 15 de
            diciembre de 2025. Participación sin obligación de compra.
            Participación limitada a mayores de edad y residentes legales de
            Puerto Rico, con excepción de las personas descritas en las reglas.
            Reglas completas en www.ganaconstarbucks.com
          </p>
        </div>
      </footer>
    </div>
  );
}
