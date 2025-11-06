import React, { useEffect, useRef, useState } from "react";
import "../styles/banner.css";

export default function StickyBanner({
  desktopImage = "/starbucks-banner.jpg",
  mobileImage = "/starbucks-banner-mobile.jpg",
  alt = "Starbucks Contest Banner",
  maxHeightPx,            // optional cap; defaults to viewport height
  minHeightPx = 220,      // allow smaller height on narrow screens
  mobileBreakpointPx = 768,
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const [imgRatio, setImgRatio] = useState(null); // width / height
  const [height, setHeight] = useState(minHeightPx);

  const readNaturalRatio = () => {
    if (!imgRef.current) return null;
    const { naturalWidth, naturalHeight } = imgRef.current;
    return naturalWidth && naturalHeight ? naturalWidth / naturalHeight : null;
  };

  const handleImgLoad = () => {
    const ratio = readNaturalRatio();
    if (ratio) setImgRatio(ratio);
    resizeToFit(ratio ?? imgRatio);
  };

  const resizeToFit = (ratioParam) => {
    const el = containerRef.current;
    if (!el) return;

    const ratio = ratioParam ?? imgRatio;
    const vw = el.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1280);
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const clampMax = maxHeightPx ?? vh;

    // If we still don't know the ratio, fallback to viewport clamp
    if (!ratio) {
      setHeight(Math.max(minHeightPx, Math.min(clampMax, vh)));
      return;
    }

    // Height so the full image is visible within available width (object-contain behavior)
    const neededHeight = vw / ratio;

    // Respect min and max caps
    const finalH = Math.max(minHeightPx, Math.min(clampMax, neededHeight));
    setHeight(finalH);
  };

  useEffect(() => {
    const onResize = () => {
      // ratio never changes after load, but recompute if source swapped (<picture> at breakpoint)
      const ratio = readNaturalRatio() ?? imgRatio;
      if (ratio && ratio !== imgRatio) setImgRatio(ratio);
      resizeToFit(ratio ?? imgRatio);
    };

    // Initial layout
    resizeToFit();

    // Observe container size changes (layout shifts)
    const ro = new ResizeObserver(() => onResize());
    if (containerRef.current) ro.observe(containerRef.current);

    // Listen to window resizes/orientation changes
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgRatio, maxHeightPx, minHeightPx, mobileBreakpointPx]);

  return (
    <section
      ref={containerRef}
      className="banner-section"
      style={{ height }}
      aria-label="sticky-hero"
    >
      <picture>
        {/* Use mobile asset below breakpoint; desktop above */}
        <source media={`(max-width: ${mobileBreakpointPx - 1}px)`} srcSet={mobileImage} />
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