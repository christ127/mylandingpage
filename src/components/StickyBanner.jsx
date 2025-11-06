import React, { useEffect, useRef, useState } from "react";
import "../styles/banner.css";

export default function StickyBanner({
  image = "/starbucks-banner.jpg",
  alt = "Starbucks Contest Banner",
  maxHeightPx,
  minHeightPx = 300,
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const [imgRatio, setImgRatio] = useState(null);
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

    if (!imgRatio) {
      setHeight(Math.max(minHeightPx, Math.min(clampMax, vh)));
      return;
    }

    const neededHeight = vw / imgRatio;
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