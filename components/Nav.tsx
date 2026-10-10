"use client";

import { useEffect, useState } from "react";
import { Mark } from "./BrandDefs";
import { ArrowDot } from "./ui";

const DARK = ".hero--dark, .section--dark, .bigticker, .contact, .footer";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#paths", label: "Who we serve" },
  { href: "#how", label: "How it works" },
  { href: "#team", label: "Team" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Track scroll, and flip to the dark nav whenever a dark section sits underneath it
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const under = document.elementsFromPoint(window.innerWidth / 2, 38).find((el) => !el.closest(".nav"));
      setDark(!!under?.closest(DARK));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Hero variants swap in place on /heroes, so re-check when the DOM changes
    const mo = new MutationObserver(onScroll);
    mo.observe(document.querySelector("main") ?? document.body, { childList: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${dark ? " is-dark" : ""}${open ? " is-open" : ""}`}>
      <div className="nav__inner wrap">
        <a className="logo" href="#top" aria-label="Nexillum home">
          <Mark className="logo__mark" />
          <span>Nexillum</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="nav__right">
          <a className="nav__email" href="mailto:hello@nexillum.com">
            <span>Email:</span> hello@nexillum.com
          </a>
          <a className="pill pill--ink nav__cta" href="#contact">
            Let’s talk <ArrowDot />
          </a>
        </div>
        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <nav className="nav__sheet" aria-label="Mobile">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a href="#contact" onClick={close}>Let’s talk ↗</a>
      </nav>
    </header>
  );
}
