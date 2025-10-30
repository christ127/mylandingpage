import React, { useEffect, useRef, useState } from "react";
import "../styles/banner.css";

export default function StickyBanner({
  image = "/starbucks-banner.jpg",
  alt = "Starbucks Contest Banner",
  maxHeightPx,   // optional clamp (defaults to viewport height)
  minHeightPx = 300, // keep some presence on very small screens
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const [imgRatio, setImgRatio] = useState(null); // width / height
  const [height, setHeight] = useState(minHeightPx);

  const handleImgLoad = () => {
    if (!imgRef.current) return;
    const { naturalWidth, naturalHeight } = imgRef.current;
    if (naturalWidth && naturalHeight) setImgRatio(naturalWidth / naturalHeight);
    resizeToFit();
  };

  const resizeToFit = () => {
    const el = containerRef.current;
    if (!el) return;

    const vw = el.clientWidth || window.innerWidth;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const clampMax = maxHeightPx ?? vh;

    // If ratio unknown (image not loaded yet), use viewport clamp
    if (!imgRatio) {
      setHeight(Math.max(minHeightPx, Math.min(clampMax, vh)));
      return;
    }

    // Height needed to show full image within available width
    const neededHeight = vw / imgRatio;

    // Final height: never exceed viewport, never go below min
    const finalH = Math.max(minHeightPx, Math.min(clampMax, neededHeight));
    setHeight(finalH);
  };

  useEffect(() => {
    resizeToFit();
    const ro = new ResizeObserver(resizeToFit);
    if (containerRef.current) ro.observe(containerRef.current);

    const onResize = () => resizeToFit();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgRatio, maxHeightPx, minHeightPx]);

  return (
    <section
      ref={containerRef}
      className="banner-section"
      style={{ height }}
      aria-label="sticky-hero"
    >
      <img
        ref={imgRef}
        src={image}
        alt={alt}
        className="banner-image"
        draggable="false"
        onLoad={handleImgLoad}
        sizes="100vw"
      />
      <div className="banner-gradient" aria-hidden="true" />
    </section>
  );
}