import React from "react";
import "../styles/how-to-participate.css";

function CartIcon() {
  return (
    <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.5 3h2l2.4 12.4a2 2 0 002 1.6h8.2a2 2 0 002-1.6L21 7H6" />
      <path d="M15 2v6M12 5h6" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2z" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  );
}

function UploadFileIcon() {
  return (
    <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6M9.5 14.5L12 12l2.5 2.5" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="9" r="6" />
      <path d="M9.5 14L7 22l5-3 5 3-2.5-8" />
    </svg>
  );
}

const DEFAULT_STEPS = [
  { icon: CartIcon, text: "Compra 2 o más productos participantes." },
  { icon: ReceiptIcon, text: "Guarda tu recibo." },
  { icon: UploadFileIcon, text: "Sube tu recibo al sitio web." },
  { icon: MedalIcon, text: "Participa para ganar el premio." },
];

export default function HowToParticipate({
  title = "¿Cómo participar?",
  steps = DEFAULT_STEPS,
}) {
  return (
    <section className="htp-section">
      <h2 className="htp-title">{title}</h2>
      <div className="htp-grid">
        {steps.map(({ icon: Icon, text }, i) => (
          <div key={i} className="htp-step">
            <div className="htp-card">
              <span className="htp-badge">{i + 1}</span>
              <Icon />
            </div>
            <p className="htp-text">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
