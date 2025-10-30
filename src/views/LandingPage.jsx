import React from "react";
import { useNavigate } from "react-router-dom";
import StickyBanner from "../components/StickyBanner";
import VisitSchedule from "../components/VisitSchedule"; // ← make sure this path matches your project

import "../styles/buttons.css";
import "../styles/footer.css";
import "../styles/schedule.css"; // styles for VisitSchedule

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#F7F5E7] flex flex-col overflow-hidden">
      {/* Banner */}
      <StickyBanner image="/starbucks-banner.jpg" />

      {/* Schedule section */}
      <div className="schedule-container">
        <div className="schedule-scrollbox">
          <VisitSchedule />
        </div>
      </div>

      {/* Floating button */}
      <main className="participa-container">
        <button
          onClick={() => nav("/Form")}
          type="button"
          className="participa-btn"
        >
          Participa
        </button>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Válido del 1 de noviembre al 15 de
            diciembre de 2025. Participación sin obligación de compra.
            Participación limitada a mayores de edad y residentes legales de
            Puerto Rico, con excepción de las personas descritas en las
            reglas.Reglas completas en www.ganaconstarbucks.com
          </p>
        </div>
      </footer>
    </div>
  );
}
