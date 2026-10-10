"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

// A soft cumulus: four bumps on a flat base. Drawn once, placed many times. Always grey.
function CloudShape() {
  return (
    <>
      <circle cx="52" cy="70" r="30" />
      <circle cx="98" cy="50" r="42" />
      <circle cx="148" cy="62" r="34" />
      <circle cx="178" cy="80" r="22" />
      <rect x="52" y="64" width="126" height="38" />
    </>
  );
}

type Placement = { x: number; y: number; s: number; depth: number; drift: number };

// x/y in a 1440×900 field; s = scale; depth = parallax strength; drift = seconds per sway
const SETS: Record<string, Placement[]> = {
  hero: [
    { x: -60, y: 90, s: 2.6, depth: 0.4, drift: 26 },
    { x: 1040, y: 40, s: 2.2, depth: 0.7, drift: 32 },
    { x: 860, y: 560, s: 3.4, depth: 1, drift: 38 },
    { x: 120, y: 620, s: 1.8, depth: 0.6, drift: 22 },
    { x: 560, y: 260, s: 1.1, depth: 0.3, drift: 18 },
  ],
  a: [
    { x: -80, y: 120, s: 2.4, depth: 0.6, drift: 30 },
    { x: 1000, y: 520, s: 3, depth: 1, drift: 36 },
    { x: 620, y: 40, s: 1.2, depth: 0.3, drift: 20 },
  ],
  b: [
    { x: 1080, y: 80, s: 2.2, depth: 0.7, drift: 28 },
    { x: -120, y: 560, s: 3.2, depth: 1, drift: 40 },
    { x: 420, y: 700, s: 1.4, depth: 0.4, drift: 24 },
  ],
};

function Cloud({ p, progress, reduce }: { p: Placement; progress: MotionValue<number>; reduce: boolean | null }) {
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [120 * p.depth, -120 * p.depth]);
  return (
    <motion.g style={{ y }}>
      <g transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
        <g className="clouds__shape" style={{ animationDuration: `${p.drift}s` }}>
          <CloudShape />
        </g>
      </g>
    </motion.g>
  );
}

export function Clouds({
  tone = "light",
  set = "a",
  className = "",
}: {
  tone?: "light" | "grey" | "dark" | "white";
  set?: keyof typeof SETS;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement | null>,
    offset: ["start end", "end start"],
  });

  return (
    <svg
      ref={ref}
      className={`clouds clouds--${tone} ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {SETS[set].map((p, i) => (
        <Cloud key={i} p={p} progress={scrollYProgress} reduce={reduce} />
      ))}
    </svg>
  );
}
