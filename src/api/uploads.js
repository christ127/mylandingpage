// src/api/uploads.js
import { api } from "./client";

/** Ask API for a short-lived SAS URL */
export async function presignUpload({ fileName, contentType, bytes }) {
  return api.post("/api/uploads/presign", { FileName: fileName, ContentType: contentType, Bytes: bytes });
}

/**
 * PUT the file directly to Azure Blob using the SAS URL.
 * Uses XMLHttpRequest instead of fetch so we can report upload progress —
 * fetch has no upload-progress event.
 */
export function uploadToBlob(uploadUrl, file, { onProgress } = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("x-ms-blob-type", "BlockBlob");
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        const err = new Error(`Blob upload failed: ${xhr.status} ${xhr.statusText}`);
        err.details = xhr.responseText;
        reject(err);
      }
    };

    xhr.onerror = () => reject(new Error("Blob upload failed: network error"));

    xhr.send(file);
  });
}