"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { AudienceLink } from "../Audience";
import { GAP_PATH } from "../BrandDefs";
import { ArrowDot } from "../ui";

/** C — the split cloud parts as you scroll and leans toward the cursor. */
export function HeroSplit() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Halves open on scroll
  const spread = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const lx = useTransform(spread, (v) => -v);
  const ly = useTransform(spread, (v) => v * 0.55);
  const rx = spread;
  const ry = useTransform(spread, (v) => -v * 0.55);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Gentle lean toward the pointer
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltX = useSpring(useTransform(py, [-1, 1], [8, -8]), { stiffness: 80, damping: 20 });
  const tiltY = useSpring(useTransform(px, [-1, 1], [-10, 10]), { stiffness: 80, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section className="hero hero--dark hs" id="top" ref={ref} onPointerMove={onMove}>
      <div className="hs__body wrap">
        <p className="eyebrow-dot eyebrow-dot--dark rise" style={{ "--d": "0s" } as React.CSSProperties}>
          <i aria-hidden="true" /> Two sides. One form.
        </p>

        <motion.div className="hs__art" style={{ rotateX: tiltX, rotateY: tiltY }} aria-hidden="true">
          <svg viewBox="200 340 700 520" className="hs__svg">
            <defs>
              <radialGradient id="hs-glow" gradientUnits="userSpaceOnUse" cx="500" cy="520" r="420">
                <stop offset="0" stopColor="#8a7bff" />
                <stop offset="1" stopColor="#6D5BFF" />
              </radialGradient>
            </defs>
            <motion.g
              clipPath="url(#nx-left)"
              initial={{ x: 40, y: -22 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 1.4, ease: [0.2, 0.7, 0.1, 1] }}
            >
              <motion.g style={{ x: lx, y: ly }}>
                <use href="#nx-cloud" mask="url(#nx-gap)" fill="url(#hs-glow)" />
              </motion.g>
            </motion.g>
            <motion.g
              clipPath="url(#nx-right)"
              initial={{ x: -40, y: 22 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 1.4, ease: [0.2, 0.7, 0.1, 1] }}
            >
              <motion.g style={{ x: rx, y: ry }}>
                <use href="#nx-cloud" mask="url(#nx-gap)" fill="url(#hs-glow)" />
              </motion.g>
            </motion.g>
            <path className="flow flow--in" d={GAP_PATH} transform="translate(-5 0)" />
            <path className="flow flow--out" d={GAP_PATH} transform="translate(5 0)" />
          </svg>
        </motion.div>

        <motion.div style={{ opacity: fade }} className="hs__text">
          <h1 className="hs__title">
            <span className="line"><span style={{ "--d": ".3s" } as React.CSSProperties}>
              Build <span className="hpill hpill--lime pop">beyond</span> borders.
            </span></span>
          </h1>
          <div className="hp__ctas rise" style={{ "--d": ".5s" } as React.CSSProperties}>
            <AudienceLink audience="founder" className="pill pill--lime pill--lg">I’m a founder <ArrowDot /></AudienceLink>
            <AudienceLink audience="org" className="pill pill--ghost pill--lg">I’m an organisation <ArrowDot /></AudienceLink>
          </div>
        </motion.div>
      </div>
      <p className="hs__scroll mono" aria-hidden="true">Scroll to open ↓</p>
    </section>
  );
}
