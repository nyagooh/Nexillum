"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Mark } from "../BrandDefs";
import { ClayArchitecture, ClayCredits, ClayScale } from "../Clay";
import { Clouds } from "../Clouds";
import { ArrowDot } from "../ui";

const PANELS = [
  {
    id: "credits",
    title: "Credits",
    body: "We help you qualify for AWS Activate credits and plan how to spend them on what moves the product.",
    Art: ClayCredits,
    tone: "violet",
  },
  {
    id: "architecture",
    title: "Architecture",
    body: "Well-architected AWS foundations that hold up when traffic does, set up alongside your team.",
    Art: ClayArchitecture,
    tone: "lime",
  },
  {
    id: "scale",
    title: "Scale",
    body: "DevOps, cost reviews and performance work as you grow, with engineers you can call.",
    Art: ClayScale,
    tone: "ink",
  },
];

/** Editorial hero: a hand-drawn underline, and clay-illustrated panels that open on hover. */
export function HeroEditorial() {
  const [active, setActive] = useState("credits");

  return (
    <section className="hero he" id="top">
      <Clouds set="hero" />
      <div className="wrap he__inner">
        <div className="he__head">
          <div>
            <p className="he__kicker rise" style={{ "--d": "0s" } as React.CSSProperties}>AWS credits & cloud</p>
            <h1 className="he__title">
              <span className="line"><span style={{ "--d": ".06s" } as React.CSSProperties}>Your cloud partner</span></span>
              <span className="line"><span style={{ "--d": ".12s" } as React.CSSProperties}>
                from{" "}
                <span className="he__mark">
                  day one
                  <svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M4 18 C 60 6, 110 26, 160 14 S 250 8, 296 16" pathLength={1} />
                    <path d="M40 26 C 100 18, 170 28, 260 22" pathLength={1} />
                  </svg>
                </span>
              </span></span>
            </h1>
          </div>
          <div className="he__aside rise" style={{ "--d": ".3s" } as React.CSSProperties}>
            <p>AWS credits, cloud architecture and engineering support for startups, all in one partner.</p>
            <a href="#contact" className="pill pill--ink pill--lg">Get started <ArrowDot /></a>
          </div>
        </div>

        <div className="he__panels rise" style={{ "--d": ".45s" } as React.CSSProperties}>
          {PANELS.map((p) => {
            const open = active === p.id;
            return (
              <motion.div
                key={p.id}
                layout
                transition={{ layout: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] } }}
                className={`hep hep--${p.tone}${open ? " is-open" : ""}`}
                onMouseEnter={() => setActive(p.id)}
                onClick={() => setActive(p.id)}
                style={{ flexGrow: open ? 4 : 1 }}
              >
                <div className="hep__art"><p.Art /></div>
                {open ? (
                  <motion.div className="hep__body" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <h2>{p.title}</h2>
                    <p>{p.body}</p>
                    <div className="hep__widget" aria-hidden="true">
                      <span className="hep__plus">+</span>
                      <span className="hep__chip mono">AWS</span>
                      <span className="hep__chip"><Mark /></span>
                      <span className="hep__chip mono">CI/CD</span>
                    </div>
                    <a href="#contact" className="hep__go" aria-label={`Talk to us about ${p.title.toLowerCase()}`}><ArrowDot /></a>
                  </motion.div>
                ) : (
                  <span className="hep__vertical">{p.title}</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
