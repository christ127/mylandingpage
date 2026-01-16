import React from "react";
import VisitSchedule from "../components/VisitSchedule";
import { useNavigate } from "react-router-dom";

import "../styles/success.css";
import "../styles/form.css"; // reuses .btn-primary / .btn-secondary from your form
import "../styles/schedule.css"; // styles for VisitSchedule

export default function SuccessPage() {
  const nav = useNavigate();

  return (
    <div className="success-page">
      {/* Success card */}
      <div className="success-card">
        <div className="success-icon">
          <svg
            className="h-7 w-7 text-[#EBB351]"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 7L10 17l-6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="success-title">¡Gracias por participar!</h1>
        <p className="success-text">
          Tu formulario fue enviado correctamente. Recibirás confirmación por
          correo si resultas ganador/a.
        </p>

        <div className="success-actions">
          <button
            onClick={() => nav("/")}
            className="btn-secondary"
            type="button"
          >
            Volver al inicio
          </button>

          <button
            onClick={() => nav("/form")}
            className="btn-primary"
            type="button"
          >
            Enviar otra participación
          </button>
        </div>
      </div>

      {/* Schedule below card, scrollable */}
      {/* <div className="schedule-container">
        <div className="schedule-scrollbox">
          <VisitSchedule />
        </div>
      </div> */}
    </div>
  );
}
