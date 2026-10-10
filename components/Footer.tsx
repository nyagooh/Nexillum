"use client";

import { useEffect, useRef } from "react";

export function Footer() {
  const nameRef = useRef<HTMLDivElement>(null);

  // Fit the name edge to edge
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "100px";
      el.style.fontSize = `${(100 * document.documentElement.clientWidth) / el.scrollWidth}px`;
    };
    document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <span>© {new Date().getFullYear()} Nexillum · Nairobi, Kenya</span>
        <nav aria-label="Footer">
          <a href="#services">Services</a>
          <a href="#paths">Who we serve</a>
          <a href="#how">How it works</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="mono">1.2921° S · 36.8219° E</span>
      </div>
      <div className="footer__name" ref={nameRef} aria-hidden="true">
        Nexillum
      </div>
    </footer>
  );
}
