import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/form.css";
import "../styles/buttons.css";
import { presignUpload, uploadToBlob } from "../api/uploads";
import { createSubmission } from "../api/submissions";

const CONTEST_SLUG = "energizer-2026"; // TODO: must match the real Contest.Slug once seeded in the DB

export default function FormPage() {
  const nav = useNavigate();
  const receiptRef = useRef(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function handleReceiptFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setReceiptFile(f);
    setReceiptPreview(URL.createObjectURL(f));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const form = new FormData(e.currentTarget);
      const firstName = form.get("firstName")?.toString() ?? "";
      const lastName = form.get("lastName")?.toString() ?? "";
      const email = form.get("email")?.toString() ?? "";
      const phone = form.get("phone")?.toString() ?? "";
      const consent = !!form.get("consent");

      if (!consent) throw new Error("Debes aceptar las reglas oficiales.");
      if (!receiptFile) throw new Error("Debes seleccionar un archivo de imagen.");

      let blobName = null;
      if (receiptFile) {
        const { uploadUrl, blobName: rb } = await presignUpload({
          fileName: receiptFile.name,
          contentType: receiptFile.type || "image/jpeg",
          bytes: receiptFile.size,
        });
        await uploadToBlob(uploadUrl, receiptFile);
        blobName = rb;
      }

      await createSubmission({
        contestSlug: CONTEST_SLUG,
        firstName,
        lastName,
        email,
        phone,
        consentGiven: true,
        consentVersion: "v1",
        blobName:     receiptFile ? blobName : null,
        contentType:  receiptFile ? receiptFile.type || "image/jpeg" : null,
        sizeBytes:    receiptFile ? receiptFile.size : null,
      });

      nav("/success");
    } catch (err) {
      console.error(err);
      setError(err?.details || err?.message || "Ocurrió un error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="form-page">
      {/* Header */}
      <header className="form-header">
        <div className="form-header-inner">
          <h1 className="form-title">Formulario de participación</h1>
          <button
            onClick={() => nav("/")}
            className="hidden sm:inline-flex btn-top-return"
          >
            Volver al inicio
          </button>
        </div>
      </header>

      <main className="flex-1">
        <div className="form-wrap">
          <form onSubmit={onSubmit} className="form-card">
            <div className="card-accent" />

            {error ? (
              <p className="form-hint" role="alert">
                Error: {error}
              </p>
            ) : (
              <p className="form-hint">
                Completa los campos y sube tu foto/recibo para participar.
              </p>
            )}

            {/* Personal info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="form-label">
                <span className="form-label-text">
                  Nombre <span className="required-star">*</span>
                </span>
                <input
                  name="firstName"
                  required
                  className="form-input"
                  placeholder="Tu nombre"
                />
              </label>

              <label className="form-label">
                <span className="form-label-text">
                  Apellido <span className="required-star">*</span>
                </span>
                <input
                  name="lastName"
                  required
                  className="form-input"
                  placeholder="Tu apellido"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="form-label">
                <span className="form-label-text">
                  Correo electrónico <span className="required-star">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  placeholder="tucorreo@ejemplo.com"
                />
              </label>

              <label className="form-label">
                <span className="form-label-text">
                  Teléfono <span className="required-star">*</span>
                </span>
                <input
                  name="phone"
                  className="form-input"
                  placeholder="(787) 555-1234"
                />
              </label>
            </div>

            {/* Receipt upload */}
            <div>
              <span className="form-label-text">
                Sube tu foto/recibo <span className="required-star">*</span>
              </span>
              <div
                onClick={() => receiptRef.current?.click()}
                className="upload-box"
              >
                {receiptPreview ? (
                  <div className="flex items-center gap-4 justify-center">
                    <img
                      src={receiptPreview}
                      alt="preview recibo"
                      className="upload-preview"
                    />
                    <span className="upload-hint">
                      <span className="upload-hint-icon">●</span> Haz clic
                      para cambiar el archivo
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="upload-hint">
                      <span className="upload-hint-icon">●</span> Haz clic
                      para seleccionar archivo (JPG/PNG)
                    </p>
                    <p className="upload-sub">
                      Tamaño máx. recomendado: 5&nbsp;MB
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={receiptRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleReceiptFile}
              />
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                required
                className="checkbox mt-[3px] h-4 w-4"
              />
              <span className="consent-text">
                Confirmo que acepto las{" "}
                <Link to="/rules" className="link-green link-underline-yellow">
                  reglas oficiales
                </Link>{" "}
                y el consentimiento.
              </span>
            </label>

            {/* Actions */}
            <div className="btn-row">
              <button
                type="button"
                onClick={() => nav("/")}
                className="btn-secondary"
              >
                Volver
              </button>
              <button className="btn-primary" disabled={busy}>
                {busy ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>

          <p className="legal">
            Al enviar aceptas nuestros términos y políticas de privacidad. Si
            resultas ganador/a, nos comunicaremos al correo provisto.
          </p>
        </div>
      </main>
    </div>
  );
}
