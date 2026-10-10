"use client";

import { useEffect, useState } from "react";
import { AudienceProvider } from "@/components/Audience";
import { BrandDefs } from "@/components/BrandDefs";
import { HEROES } from "@/components/heroes";
import { Nav } from "@/components/Nav";

/** Hero comparison: one variant at a time, switch with the dock or ← → keys. Deep link with #a … #d. */
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

  const { Component } = HEROES[i];

  return (
    <AudienceProvider>
      <BrandDefs />
      <Nav />
      <main>
        <Component key={HEROES[i].id} />
        {/* Room to scroll, so scroll-driven variants can be tried */}
        <div className="heroes__spacer">
          <p className="mono">Rest of the page continues here ↓</p>
        </div>
      </main>

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
    </AudienceProvider>
  );
}
