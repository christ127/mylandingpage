const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5111";
console.log(BASE);
async function request(path, { method = "GET", headers = {}, body, raw = false } = {}) {
  const url = `${BASE}${path}`;
  const opts = {
    method,
    headers: {
      ...(body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
  };

  const res = await fetch(url, opts);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let details;
    try { details = JSON.parse(text); } catch { details = text; }
    const err = new Error(`HTTP ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.details = details;
    throw err;
  }

  if (raw) return res;            // caller handles stream/text/arrayBuffer
  if (res.status === 204) return null;

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

export const api = {
  get: (path, opts = {}) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts = {}) => request(path, { ...opts, method: "POST", body }),
  getRaw: (path, opts = {}) => request(path, { ...opts, method: "GET", raw: true }),
  baseUrl: BASE,
};