import React from "react";
import { useNavigate } from "react-router-dom";
import StickyBanner from "../components/StickyBanner";
import "../styles/buttons.css";
import "../styles/footer.css";

export default function LandingPage() {
    const nav = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#F7F5E7] flex flex-col overflow-hidden">
      {/* Banner */}
      <StickyBanner image="/starbucks-banner.jpg" />

      {/* Floating button */}
      <main className="participa-container">
        <button 
        onClick={() => nav("/Form")}
        type="button" className="participa-btn">
          Participa
        </button>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Válido del 1 de noviembre al 15 de diciembre de 2025. Participación sin obligación de compra. Participación limitada a mayores de edad y residentes legales de Puerto Rico, con excepción de las personas descritas en las reglas.Reglas completas en www.ganaconstarbucks.com
          </p>         
        </div>
      </footer>
    </div>
  );
}
