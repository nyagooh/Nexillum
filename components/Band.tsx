"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Clouds } from "./Clouds";

/** Two rows of giant type sliding in opposite directions as you scroll. */
export function Band() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const row1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const row2 = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  return (
    <div className="band" ref={ref} aria-hidden="true">
      <Clouds tone="dark" set="a" />
      <motion.p style={{ x: row1 }}>AWS credits ✳ Cloud architecture ✳ AWS credits ✳ Cloud architecture ✳</motion.p>
      <motion.p style={{ x: row2 }} className="band__outline">DevOps ✳ Cost optimisation ✳ Migration ✳ DevOps ✳ Cost optimisation ✳</motion.p>
    </div>
  );
}
