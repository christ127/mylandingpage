import React from "react";
import "../styles/banner.css";

export default function StickyBanner({ image = "/starbucks-banner.jpg" }) {
  return (
    <section className="banner-section">
      <img src={image} alt="Starbucks Contest Banner" className="banner-image" draggable="false" />
      <div className="banner-gradient"></div>
    </section>
  );
}