import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import "../styles/buttons.css";
import { presignUpload, uploadToBlob } from "../api/uploads";
import { createSubmission } from "../api/submissions";

const CONTEST_SLUG = "alpo-2026";

export default function FormPage() {
  const nav = useNavigate();
  const receiptRef = useRef(null);
  const dogPhotoRef = useRef(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [dogPhotoPreview, setDogPhotoPreview] = useState(null);
  const [dogPhotoFile, setDogPhotoFile] = useState(null);
  const [noPurchase, setNoPurchase] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function handleReceiptFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setReceiptFile(f);
    setReceiptPreview(URL.createObjectURL(f));
  }

  function handleDogPhotoFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setDogPhotoFile(f);
    setDogPhotoPreview(URL.createObjectURL(f));
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
      const dogName = form.get("dogName")?.toString() ?? "";
      const dogStory = form.get("dogStory")?.toString() ?? "";
      const consent = !!form.get("consent");
      const noPurchase = !!form.get("noPurchase");

      if (!consent) throw new Error("Debes aceptar las reglas oficiales.");
      if (!receiptFile)
        throw new Error("Debes seleccionar un archivo de imagen.");

      const { uploadUrl, blobName } = await presignUpload({
        fileName: receiptFile.name,
        contentType: receiptFile.type || "image/jpeg",
        bytes: receiptFile.size,
      });

      await uploadToBlob(uploadUrl, receiptFile);

      let dogPhotoBlobName = null;
      if (dogPhotoFile) {
        const { uploadUrl: dogUrl, blobName: dogBlob } = await presignUpload({
          fileName: dogPhotoFile.name,
          contentType: dogPhotoFile.type || "image/jpeg",
          bytes: dogPhotoFile.size,
        });
        await uploadToBlob(dogUrl, dogPhotoFile);
        dogPhotoBlobName = dogBlob;
      }

      await createSubmission({
        contestSlug: CONTEST_SLUG,
        firstName,
        lastName,
        email,
        phone,
        dogName,
        dogStory,
        consentGiven: true,
        consentVersion: "v1",
        noPurchase,
        blobName,
        contentType: receiptFile.type || "image/jpeg",
        sizeBytes: receiptFile.size,
        dogPhotoBlobName,
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

            {/* Dog info */}
            <label className="form-label">
              <span className="form-label-text">
                Nombre de tu héroe <span className="required-star">*</span>
              </span>
              <input
                name="dogName"
                required
                className="form-input"
                placeholder="Nombre de tu héroe"
              />
            </label>

            <label className="form-label">
              <span className="form-label-text">
                ¿Cuál es su historia? <span className="required-star">*</span>
              </span>
              <textarea
                name="dogStory"
                required
                rows={4}
                className="form-input"
                placeholder="Cuéntanos la historia de tu héroe..."
                style={{ resize: "vertical" }}
              />
            </label>

            {/* Receipt upload */}
            {!noPurchase && (
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
            )}

            {/* Dog photo upload */}
            <div>
              <span className="form-label-text">
                Foto del perro <span className="required-star">*</span>
              </span>
              <div
                onClick={() => dogPhotoRef.current?.click()}
                className="upload-box"
              >
                {dogPhotoPreview ? (
                  <div className="flex items-center gap-4 justify-center">
                    <img
                      src={dogPhotoPreview}
                      alt="preview perro"
                      className="upload-preview"
                    />
                    <span className="upload-hint">
                      <span className="upload-hint-icon">●</span> Haz clic para
                      cambiar la foto
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="upload-hint">
                      <span className="upload-hint-icon">●</span> Haz clic para
                      seleccionar foto de tu perro (JPG/PNG)
                    </p>
                    <p className="upload-sub">
                      Tamaño máx. recomendado: 5&nbsp;MB
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={dogPhotoRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleDogPhotoFile}
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
                <a href="/rules" className="link-green link-underline-yellow">
                  reglas oficiales
                </a>{" "}
                y el consentimiento.
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="noPurchase"
                className="checkbox mt-[3px] h-4 w-4"
                checked={noPurchase}
                onChange={(e) => setNoPurchase(e.target.checked)}
              />
              <span className="consent-text">Participación sin compra.</span>
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
