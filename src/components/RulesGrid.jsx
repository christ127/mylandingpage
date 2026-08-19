import React from "react";
import "../styles/rules-grid.css";

function CheckBadgeIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M12 2l2.2 1.3 2.5-.3 1.2 2.2 2.2 1.2-.3 2.5L21 11l-1.3 2.2.3 2.5-2.2 1.2-1.2 2.2-2.5-.3L12 20l-2.2-1.3-2.5.3-1.2-2.2-2.2-1.2.3-2.5L3 11l1.3-2.2-.3-2.5 2.2-1.2 1.2-2.2 2.5.3z" />
      <path d="M8.5 12l2.3 2.3L16 9.5" />
    </svg>
  );
}

const DEFAULT_RULES = [
  "Aplica únicamente en las tiendas participantes.",
  "Ser mayor de 18 años.",
  "Residente del territorio aplicable.",
  "Cumplir con los requisitos de compra y registro del recibo.",
];

export default function RulesGrid({
  title = "Reglas del concurso",
  rules = DEFAULT_RULES,
}) {
  return (
    <section className="rg-section">
      <h2 className="rg-title">{title}</h2>
      <div className="rg-grid">
        {rules.map((rule, i) => (
          <div key={i} className="rg-pill">
            <span className="rg-badge">
              <CheckBadgeIcon />
            </span>
            <p className="rg-text">{rule}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
