"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const PILLS = [
  { text: "We", cls: "hzp--soft", from: -320 },
  { text: "Build", cls: "hzp--violet", from: -140 },
  { text: "→", cls: "hzp--ink", from: 140 },
  { text: "Higher", cls: "hzp--ghost", from: 320 },
];

function Pill({ p, progress }: { p: (typeof PILLS)[number]; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], [p.from, 0]);
  const rotate = useTransform(progress, [0, 1], [p.from / 40, 0]);
  return <motion.span className={`hzp ${p.cls}`} style={{ x, rotate }}>{p.text}</motion.span>;
}

/** About: a plain statement, then pills that slide together into a sentence as you scroll. */
export function About() {
  const pillsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pillsRef, offset: ["start end", "center 0.6"] });

  return (
    <section className="about" id="about">
      <div className="wrap about__intro">
        <p className="about__kicker">About us</p>
        <p className="about__text">
          We help startups build on AWS <span>with credits to start, architecture to grow and engineers to call</span>, from first commit to scale.
        </p>
      </div>
      <div className="about__pills" ref={pillsRef}>
        {PILLS.map((p) => <Pill key={p.text} p={p} progress={scrollYProgress} />)}
      </div>
    </section>
  );
}
