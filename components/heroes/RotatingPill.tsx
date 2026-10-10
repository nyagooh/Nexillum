"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const ease = [0.2, 0.7, 0.1, 1] as const;

/** A pill inside a headline whose words roll over, resizing smoothly to fit. */
export function RotatingPill({
  words,
  className = "",
  interval = 2600,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  return (
    <motion.span layout className={`hpill ${className}`} transition={{ layout: { duration: 0.55, ease } }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          layout="position"
          className="hpill__word"
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-120%", opacity: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
