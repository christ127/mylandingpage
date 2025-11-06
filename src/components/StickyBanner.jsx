import React, { useEffect, useRef, useState } from "react";
import "../styles/banner.css";

export default function StickyBanner({
  desktopImage = "/starbucks-banner.jpg",
  mobileImage = "/starbucks-banner-mobile.jpg",
  alt = "Starbucks Contest Banner",
  maxHeightPx,
  minHeightPx = 300,
  mobileBreakpointPx = 768,
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

    const vw = el.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1280);
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const clampMax = maxHeightPx ?? vh;

    if (!imgRatio) {
      setHeight(Math.max(minHeightPx, Math.min(clampMax, vh)));
      return;
    }

    // We still compute a reasonable height for the sticky hero,
    // even though the image itself will "cover" the container.
    const neededHeight = vw / imgRatio;
    const finalH = Math.max(minHeightPx, Math.min(clampMax, neededHeight));
    setHeight(finalH);
  };

  useEffect(() => {
    const onResize = () => {
      if (imgRef.current) {
        const { naturalWidth, naturalHeight } = imgRef.current;
        if (naturalWidth && naturalHeight) setImgRatio(naturalWidth / naturalHeight);
      }
      resizeToFit();
    };

    resizeToFit();

    const ro = new ResizeObserver(resizeToFit);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [imgRatio, maxHeightPx, minHeightPx, mobileBreakpointPx]);

  return (
    <section
      ref={containerRef}
      className="banner-section"
      style={{ height }}
      aria-label="sticky-hero"
    >
      <picture>
        {/* Mobile first source up to breakpoint */}
        <source
          media={`(max-width: ${mobileBreakpointPx - 1}px)`}
          srcSet={mobileImage}
        />
        {/* Desktop fallback */}
        <img
          ref={imgRef}
          src={desktopImage}
          alt={alt}
          className="banner-image"
          draggable="false"
          onLoad={handleImgLoad}
          sizes="100vw"
        />
      </picture>

      <div className="banner-gradient" aria-hidden="true" />
    </section>
  );
}