// src/pages/SubmissionsPage.jsx
import React, { useEffect, useState } from "react";
import "../styles/submissions.css";
import { api } from "../api/client";
import { exportSubmissionsCsv } from "../api/submissions";

const DEFAULT_CONTEST_SLUG = "wishbone-2026";

async function fetchSubmissions({ contestSlug, page, pageSize, adminKey }) {
  const params = new URLSearchParams({
    contestSlug,
    page: String(page),
    pageSize: String(pageSize),
  });

  // Use the shared api client instead of raw fetch
  return api.get(`/api/submissions?${params.toString()}`, {
    headers: {
      "x-admin-key": adminKey,
    },
  });
}

export default function SubmissionsPage() {
  const [adminKey, setAdminKey] = useState("");
  const [storedKeyChecked, setStoredKeyChecked] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [contestSlug, setContestSlug] = useState(DEFAULT_CONTEST_SLUG);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);

  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    const savedKey = localStorage.getItem("adminKey");
    if (savedKey) {
      setAdminKey(savedKey);
    }
    setStoredKeyChecked(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setLoadError("");
    setLoading(true);

    try {
      const data = await fetchSubmissions({
        contestSlug,
        page: 1,
        pageSize,
        adminKey,
      });

      setIsAuthenticated(true);
      setPage(1);
      setItems(data.items);
      setTotal(data.total);
      setLoading(false);
      localStorage.setItem("adminKey", adminKey);
    } catch (err) {
      console.error(err);
      setLoading(false);

      // err.status comes from your client.js request() helper
      if (err.status === 401) {
        setAuthError("Clave de administrador incorrecta.");
      } else {
        setAuthError("Error al intentar cargar los datos.");
      }

      setIsAuthenticated(false);
    }
  };

  const loadPage = async (newPage) => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await fetchSubmissions({
        contestSlug,
        page: newPage,
        pageSize,
        adminKey,
      });

      setPage(newPage);
      setItems(data.items);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);

      if (err.status === 401) {
        setIsAuthenticated(false);
        setAuthError("Tu sesión de admin expiró. Ingresa la clave nuevamente.");
      } else {
        setLoadError("Error cargando la página.");
      }
    }
  };

  if (!storedKeyChecked) {
    return (
      <div className="admin-page flex items-center justify-center">
        <span className="text-sm text-neutral-600">Cargando…</span>
      </div>
    );
  }

  /* ---------- UNAUTHENTICATED VIEW ---------- */
  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <header className="admin-header">
          <div className="admin-header-inner">
            <div>
              <h1 className="admin-title">Panel de formularios</h1>
              <p className="text-xs text-neutral-600 mt-1">
                Solo para uso interno del equipo de la promoción.
              </p>
            </div>
            <div className="admin-top-actions">
              <span className="admin-tag">Admin</span>
            </div>
          </div>
        </header>

        <main className="admin-main">
          <div className="admin-login-wrapper">
            <div className="admin-login-card">
              <div>
                <h2 className="admin-login-title">Ingresar al panel</h2>
                <p className="admin-login-subtitle">
                  Introduce la clave de administrador para ver las
                  participaciones.
                </p>
              </div>

              {authError && (
                <div className="admin-alert-error">{authError}</div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="admin-field">
                  <label htmlFor="adminKey" className="admin-label">
                    Admin key
                  </label>
                  <input
                    id="adminKey"
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="admin-input"
                    required
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="contestSlug" className="admin-label">
                    Contest slug
                  </label>
                  <input
                    id="contestSlug"
                    type="text"
                    value={contestSlug}
                    onChange={(e) => setContestSlug(e.target.value)}
                    className="admin-input"
                    required
                  />
                </div>

                <div className="admin-login-actions">
                  <p className="admin-help-text">
                    La clave se guardará localmente para futuras visitas.
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? "Verificando..." : "Entrar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ---------- AUTHENTICATED VIEW ---------- */
  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div>
            <h1 className="admin-title">Panel de Submissions</h1>
            <p className="text-xs text-neutral-600 mt-1">
              Revisar y administrar las participaciones del concurso.
            </p>
          </div>
          <div className="admin-top-actions">
            <span className="admin-tag">Admin</span>
            <button
              type="button"
              className="admin-btn-link"
              onClick={() => {
                setIsAuthenticated(false);
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title-wrap">
              <h2 className="admin-card-title">Submissions del concurso</h2>
              <p className="admin-card-subtitle">
                Contest slug:{" "}
                <span className="font-semibold">{contestSlug}</span>
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="admin-badge-pill">
                Total: <span className="ml-1 font-semibold">{total}</span>
              </span>
              <span className="text-xs text-neutral-500">
                Página {page} de {totalPages}
              </span>
            </div>
          </div>

          <div className="admin-meta-row">
            <div className="admin-meta-left">
              <span>
                Mostrando <span className="font-semibold">{pageSize}</span> por
                página
              </span>
              {loading && <span>· Cargando…</span>}
            </div>
            <div className="admin-meta-right">
              <button
                type="button"
                className="btn-secondary"
                disabled={loading}
                onClick={() => loadPage(page)}
              >
                Refrescar
              </button>

              <button
                type="button"
                className="btn-primary"
                disabled={loading || total === 0}
                onClick={() => exportSubmissionsCsv(contestSlug, adminKey)}
              >
                Exportar CSV
              </button>
            </div>
          </div>

          {loadError && <div className="admin-alert-error">{loadError}</div>}

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="admin-th">Nombre</th>
                  <th className="admin-th">Email</th>
                  <th className="admin-th">Consent</th>
                  <th className="admin-th">Versión</th>
                  <th className="admin-th">Creado</th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.email} className="admin-row">
                    {" "}
                    {/* use email as key now */}
                    <td className="admin-td">
                      {s.firstName} {s.lastName}
                    </td>
                    <td className="admin-td">{s.email}</td>
                    <td className="admin-td">
                      {s.consentGiven ? (
                        <span className="badge-yes">Sí</span>
                      ) : (
                        <span className="badge-no">No</span>
                      )}
                    </td>
                    <td className="admin-td">{s.consentVersion}</td>
                    <td className="admin-td">
                      <span className="admin-date">
                        {new Date(s.createdAtUtc).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="admin-td">
                      <div className="admin-empty">No hay submissions.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="admin-pagination">
            <div className="admin-page-info">
              Página <span className="font-semibold">{page}</span> de{" "}
              <span className="font-semibold">{totalPages}</span>
            </div>
            <div className="admin-page-buttons">
              <button
                type="button"
                className="admin-page-btn"
                disabled={page <= 1 || loading}
                onClick={() => loadPage(page - 1)}
              >
                Anterior
              </button>
              <button
                type="button"
                className={`admin-page-btn admin-page-btn-active`}
                disabled
              >
                {page}
              </button>
              <button
                type="button"
                className="admin-page-btn"
                disabled={page >= totalPages || loading}
                onClick={() => loadPage(page + 1)}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
