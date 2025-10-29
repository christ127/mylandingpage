import { api } from "./client";

export function createSubmission(payload) {
  // payload must include: contestSlug, firstName, lastName, email, consentGiven, consentVersion,
  // and optionally: blobName, contentType, sizeBytes
  return api.post("/api/submissions", payload);
}

export function listSubmissions({ contestSlug, page = 1, pageSize = 50 }) {
  const q = new URLSearchParams({ contestSlug, page: String(page), pageSize: String(pageSize) });
  return api.get(`/api/submissions?${q.toString()}`);
}

export async function exportSubmissionsCsv(contestSlug) {
  // start a browser download by navigating to the CSV export endpoint
  const href = `${api.baseUrl}/api/submissions/export?contestSlug=${encodeURIComponent(contestSlug)}`;
  // trigger download in a new tab to preserve current UI
  window.open(href, "_blank", "noopener");
}