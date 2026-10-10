"use client";

import { useEffect, useState } from "react";
import { BrandDefs } from "@/components/BrandDefs";
import { Footer } from "@/components/Footer";
import { HEROES } from "@/components/heroes";
import { Landing } from "@/components/Landing";
import { Nav } from "@/components/Nav";
import { RevealObserver } from "@/components/RevealObserver";

/** Full-page comparison: each hero variant above the same landing page. Switch with the dock or ← → keys; deep link with #a … #e. */
export default function HeroesPage() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const fromHash = HEROES.findIndex((h) => `#${h.id}` === window.location.hash);
    if (fromHash >= 0) setI(fromHash);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((n) => (n + 1) % HEROES.length);
      if (e.key === "ArrowLeft") setI((n) => (n - 1 + HEROES.length) % HEROES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    history.replaceState(null, "", `#${HEROES[i].id}`);
    window.scrollTo(0, 0);
  }, [i]);

  const { id, Component } = HEROES[i];

  return (
    <>
      <BrandDefs />
      <Nav />
      {/* Keyed so each variant mounts fresh, with its own reveals and scroll effects */}
      <main key={id}>
        <Component />
        <Landing />
      </main>
      <Footer />
      <RevealObserver />

      <div className="dock" role="tablist" aria-label="Hero variants">
        <p className="dock__note">{HEROES[i].note}</p>
        <div className="dock__tabs">
          {HEROES.map((h, n) => (
            <button key={h.id} role="tab" aria-selected={n === i} onClick={() => setI(n)}>
              <span className="mono">{h.id.toUpperCase()}</span> {h.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
