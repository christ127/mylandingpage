// src/api/uploads.js
import { api } from "./client";

/** Ask API for a short-lived SAS URL */
export async function presignUpload({ fileName, contentType, bytes }) {
  return api.post("/api/uploads/presign", { FileName: fileName, ContentType: contentType, Bytes: bytes });
}

/** PUT the file directly to Azure Blob using the SAS URL */
export async function uploadToBlob(uploadUrl, file) {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`Blob upload failed: ${res.status} ${res.statusText}`);
    err.details = text;
    throw err;
  }
}