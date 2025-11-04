import React, { useEffect, useRef, useState } from "react";
import "../styles/banner.css";

export default function StickyBanner({
  desktopImage = "/starbucks-banner.jpg",
  mobileImage = "/starbucks-banner-mobile.jpg",
  alt = "Starbucks Contest Banner",
  maxHeightPx,               // optional clamp (defaults to viewport height)
  minHeightPx = 300,         // keep some presence on very small screens
  mobileBreakpointPx = 768,  // match your Tailwind sm/md breakpoints as needed
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

    const vw = el.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 1280);
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const clampMax = maxHeightPx ?? vh;

    if (!imgRatio) {
      setHeight(Math.max(minHeightPx, Math.min(clampMax, vh)));
      return;
    }

    const neededHeight = vw / imgRatio; // show full image within available width
    const finalH = Math.max(minHeightPx, Math.min(clampMax, neededHeight));
    setHeight(finalH);
  };

  useEffect(() => {
    resizeToFit();

    // Observe container size changes
    const ro = new ResizeObserver(resizeToFit);
    if (containerRef.current) ro.observe(containerRef.current);

    // Recompute on viewport changes (breakpoint swaps, orientation, etc.)
    const onResize = () => {
      // Force ratio recalculation in case picture swapped the image source
      if (imgRef.current) {
        const { naturalWidth, naturalHeight } = imgRef.current;
        if (naturalWidth && naturalHeight) setImgRatio(naturalWidth / naturalHeight);
      }
      resizeToFit();
    };

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
      {/* Picture swaps source by media query; img still receives the chosen file */}
      <picture>
        {/* Mobile first: use mobileImage up to breakpoint */}
        <source
          media={`(max-width: ${mobileBreakpointPx - 1}px)`}
          srcSet={mobileImage}
        />
        {/* Desktop fallback renders below */}
        <img
          ref={imgRef}
          src={desktopImage}
          alt={alt}
          className="banner-image"
          draggable="false"
          onLoad={handleImgLoad}
          // "sizes" hints the layout width for better selection if you later add srcset DPRs
          sizes="100vw"
        />
      </picture>

      <div className="banner-gradient" aria-hidden="true" />
    </section>
  );
}
