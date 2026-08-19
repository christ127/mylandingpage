// import.meta.env.BASE_URL's trailing slash differs by environment (e.g. "/mylandingpage"
// locally vs "/" on Vercel, where VITE_BASE_PATH is set for the custom domain) — a naive
// template-string join breaks in one environment or the other depending on which way you
// guess. This normalizes it so the result is correct either way.
export function publicUrl(path) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}
