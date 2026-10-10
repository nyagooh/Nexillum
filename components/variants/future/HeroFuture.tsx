"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Mark } from "../../BrandDefs";
import { ClayTower } from "../../Clay";
import "./future.css";

/** A circular CTA with its label running round the rim */
function CircleCta({ label = "Apply now", href = "#contact" }: { label?: string; href?: string }) {
  const text = `${label} · `.repeat(3);
  return (
    <a href={href} className="fu-circle" aria-label={label}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs><path id="fu-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
        <text><textPath href="#fu-ring">{text.toUpperCase()}</textPath></text>
      </svg>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

/**
 * Future — a drifting mesh gradient behind giant type, a tower of clay clouds framed in an arch
 * at the centre, and a word band crossing in front.
 */
export function HeroFuture() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const skyScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.3]);
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const towerY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const towerImg = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const futureX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const readyX = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bandX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="hero fu-hero" id="top">
      {/* Soft mesh gradient: four colour fields drifting past each other */}
      <motion.div className="fu-mesh" style={{ scale: skyScale, y: skyY }} aria-hidden="true">
        <i /><i /><i /><i />
      </motion.div>
      <div className="fu-veil" aria-hidden="true" />

      <div className="fu-stage wrap">
        <div className="fu-top">
          <h1 className="fu-title">
            <motion.span className="fu-title__a" style={{ x: futureX }}>
              <span className="line"><span style={{ "--d": ".1s" } as React.CSSProperties}>Future</span></span>
            </motion.span>
            <motion.span className="fu-title__b" style={{ x: readyX }}>
              <span className="line"><span style={{ "--d": ".2s" } as React.CSSProperties}>ready.</span></span>
            </motion.span>
          </h1>
          <p className="fu-hero__copy rise" style={{ "--d": ".35s" } as React.CSSProperties}>
            AWS credits to start, cloud architecture to grow, and engineers on call when it matters. Built for startups.
          </p>
        </div>

        <div className="fu-badge rise" style={{ "--d": ".5s" } as React.CSSProperties}>
          <span className="fu-badge__mark"><Mark /></span>
          <span><small>AWS Activate</small>Credit support</span>
        </div>

        <div className="fu-cta rise" style={{ "--d": ".55s" } as React.CSSProperties}><CircleCta /></div>

        <div className="fu-note rise" style={{ "--d": ".6s" } as React.CSSProperties}>
          <span className="fu-note__icon"><Mark /></span>
          <p>Startup<br />programme<br /><b>now open</b></p>
        </div>
      </div>

      <motion.div className="fu-tower" style={{ y: towerY }}>
        <div className="fu-tower__frame">
          <motion.div className="fu-tower__art" style={{ y: towerImg }}><ClayTower /></motion.div>
          <span className="fu-tower__tag mono">Same cloud</span>
        </div>
        <svg className="fu-orbit" viewBox="0 0 600 900" aria-hidden="true">
          <path className="fu-orbit__path" d="M520 140 C 640 420, 520 760, 300 840 C 90 910, -40 640, 70 380" pathLength={1} />
          <path className="fu-spark" d="M512 118 l7 -20 l7 20 l20 7 l-20 7 l-7 20 l-7 -20 l-20 -7 Z" />
        </svg>
      </motion.div>

      <motion.p className="fu-band" style={{ x: bandX }} aria-hidden="true">
        AWS credits <i /> Cloud architecture <i /> DevOps <i /> Cost optimisation <i /> AWS credits <i /> Cloud architecture
      </motion.p>
      <p className="fu-bandnote mono">Same cloud. Higher possibilities.</p>
    </section>
  );
}
