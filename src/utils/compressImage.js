const COMPRESSIBLE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

/**
 * Downscales + re-encodes an image file client-side before upload, to cut
 * upload time on mobile connections. Falls back to the original file
 * whenever compression isn't applicable or doesn't actually help — this
 * should never block or worsen a submission.
 */
export async function compressImage(file, { maxDimension = 1920, quality = 0.82 } = {}) {
  if (!COMPRESSIBLE_TYPES.has(file.type)) return file;

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });

    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (!blob || blob.size >= file.size) return file;

    const compressedName = file.name.replace(/\.\w+$/, "") + ".jpg";
    return new File([blob], compressedName, { type: "image/jpeg" });
  } catch (err) {
    console.warn("Image compression failed, using original file:", err);
    return file;
  }
}
