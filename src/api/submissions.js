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

export async function exportSubmissionsCsv(contestSlug, adminKey) {
    const q = new URLSearchParams({
      contestSlug,
    });
  
    if (adminKey) {
      q.append("adminKey", adminKey); // only if your backend supports this
    }
  
    const href = `${api.baseUrl}/api/submissions/export?${q.toString()}`;
    window.open(href, "_blank", "noopener");
  }