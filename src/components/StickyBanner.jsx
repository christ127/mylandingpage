import React, { useEffect, useRef, useState } from "react";
import "../styles/banner.css";

export default function StickyBanner({
  desktopImage = "/starbucks-banner.jpg",
  mobileImage = "/starbucks-banner-mobile.jpg",
  alt = "Starbucks Contest Banner",
  minHeightPx = 260,
  mobileBreakpointPx = 768,
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const [imgRatio, setImgRatio] = useState(null);
  const [height, setHeight] = useState(minHeightPx);

  const getRatio = () => {
    if (!imgRef.current) return null;
    const { naturalWidth, naturalHeight } = imgRef.current;
    if (!naturalWidth || !naturalHeight) return null;
    return naturalWidth / naturalHeight;
  };

  const resize = (ratioOverride) => {
    const ratio = ratioOverride ?? imgRatio ?? getRatio();
    if (!ratio) return;

    const el = containerRef.current;
    if (!el) return;

    const vw = el.clientWidth;
    const neededHeight = vw / ratio; // height needed to show full image (contain)

    setHeight(Math.max(minHeightPx, neededHeight));
  };

  const handleLoad = () => {
    const ratio = getRatio();
    if (ratio) setImgRatio(ratio);
    resize(ratio);
  };

  useEffect(() => {
    resize();

    const ro = new ResizeObserver(() => resize());
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, [imgRatio]);

  return (
    <section
      ref={containerRef}
      className="banner-section"
      style={{ height }}
      aria-label="sticky-hero"
    >
      <picture>
        <source media={`(max-width: ${mobileBreakpointPx - 1}px)`} srcSet={mobileImage} />
        <img
          ref={imgRef}
          src={desktopImage}
          alt={alt}
          className="banner-image"
          draggable="false"
          onLoad={handleLoad}
          sizes="100vw"
        />
      </picture>
    </section>
  );
}