import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/form.css";
import "../styles/buttons.css";
import { presignUpload, uploadToBlob } from "../api/uploads";
import { createSubmission } from "../api/submissions";
import { compressImage } from "../utils/compressImage";

const CONTEST_SLUG = "energizer-2026"; // TODO: must match the real Contest.Slug once seeded in the DB

export default function FormPage() {
  const nav = useNavigate();
  const receiptRef = useRef(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Upload starts as soon as a file is selected, not on submit, so it's
  // usually already done (or well underway) by the time the user finishes
  // filling in the rest of the form.
  const uploadTokenRef = useRef(0);
  const uploadPromiseRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle | uploading | done | error
  const [uploadProgress, setUploadProgress] = useState(0);

  function startUpload(file) {
    const token = ++uploadTokenRef.current;
    setUploadStatus("uploading");
    setUploadProgress(0);

    const promise = (async () => {
      const { uploadUrl, blobName } = await presignUpload({
        fileName: file.name,
        contentType: file.type || "image/jpeg",
        bytes: file.size,
      });
      await uploadToBlob(uploadUrl, file, {
        onProgress: (pct) => {
          if (uploadTokenRef.current === token) setUploadProgress(pct);
        },
      });
      return { blobName, contentType: file.type || "image/jpeg", sizeBytes: file.size };
    })();

    uploadPromiseRef.current = promise;

    promise.then(
      () => {
        if (uploadTokenRef.current === token) setUploadStatus("done");
      },
      () => {
        if (uploadTokenRef.current === token) setUploadStatus("error");
      }
    );
  }

  async function handleReceiptFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError("");
    const compressed = await compressImage(f);
    setReceiptFile(compressed);
    setReceiptPreview(URL.createObjectURL(compressed));
    startUpload(compressed);
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
      if (!receiptFile || !uploadPromiseRef.current) {
        throw new Error("Debes seleccionar un archivo de imagen.");
      }

      let uploadResult;
      try {
        uploadResult = await uploadPromiseRef.current;
      } catch {
        throw new Error("No se pudo subir el archivo. Intenta de nuevo.");
      }

      await createSubmission({
        contestSlug: CONTEST_SLUG,
        firstName,
        lastName,
        email,
        phone,
        consentGiven: true,
        consentVersion: "v1",
        blobName: uploadResult.blobName,
        contentType: uploadResult.contentType,
        sizeBytes: uploadResult.sizeBytes,
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

              {uploadStatus === "uploading" && (
                <>
                  <div className="upload-progress-track">
                    <div
                      className="upload-progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="upload-status-text upload-status-text--ok">
                    Subiendo... {uploadProgress}%
                  </p>
                </>
              )}
              {uploadStatus === "done" && (
                <p className="upload-status-text upload-status-text--ok">
                  Archivo subido ✓
                </p>
              )}
              {uploadStatus === "error" && (
                <p className="upload-status-text upload-status-text--error">
                  No se pudo subir el archivo. Selecciónalo de nuevo para reintentar.
                </p>
              )}
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
              <button
                className="btn-primary"
                disabled={busy || uploadStatus === "uploading"}
              >
                {busy
                  ? "Enviando..."
                  : uploadStatus === "uploading"
                  ? "Subiendo imagen..."
                  : "Enviar"}
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
