"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { ClayArchitecture, ClayCredits, ClayScale } from "../../Clay";
import { useEffect, useRef, useState } from "react";
import "./collection.css";

// WebGL only runs in the browser
const ClayStage = dynamic(() => import("../../three/ClayStage").then((m) => m.ClayStage), { ssr: false });

const LOOKS = [
  { Art: ClayCredits, no: "01", title: "AWS Activate credits", note: "Eligibility, application, spend plan" },
  { Art: ClayArchitecture, no: "02", title: "Cloud architecture", note: "Accounts, networking, guardrails" },
  { Art: ClayScale, no: "03", title: "Scale & cost", note: "DevOps, monitoring, a predictable bill" },
];

/** Collection — a dark studio: moving stage-light gradient, bold-and-hairline type, a live 3D clay mark, a lookbook rail. */
export function HeroCollection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [look, setLook] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const boldX = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const thinX = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const stormY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const stormScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);

  // The lookbook rail cycles on its own; hovering a thumbnail takes over
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setLook((n) => (n + 1) % LOOKS.length), 4200);
    return () => clearInterval(id);
  }, [reduce]);

  const current = LOOKS[look];

  return (
    <section ref={ref} className="hero cl-hero" id="top" data-dark>
      {/* Stage light: slow-moving violet and lime glows over deep ink */}
      <motion.div className="cl-glow" style={{ y: stormY, scale: stormScale }} aria-hidden="true">
        <i /><i /><i />
      </motion.div>
      <div className="cl-spot" aria-hidden="true" />

      {/* Thin frame with corner ticks, like a camera viewfinder */}
      <div className="cl-frame" aria-hidden="true"><i /><i /><i /><i /></div>

      <div className="cl-hero__labels wrap">
        <span>Credits /<br />Architecture</span>
        <span className="cl-center">We set up AWS for startups<br />that plan to grow</span>
        <span className="cl-right">Scale /<br />Support</span>
      </div>

      <h1 className="cl-hero__title">
        <motion.span className="cl-bold" style={{ x: boldX }}>
          <span className="line"><span style={{ "--d": ".1s" } as React.CSSProperties}>Same cloud <i>·</i> Higher</span></span>
        </motion.span>
        <motion.span className="cl-thin" style={{ x: thinX }}>
          <span className="line"><span style={{ "--d": ".25s" } as React.CSSProperties}>possibilities<sup>®</sup></span></span>
        </motion.span>
      </h1>

      <motion.div className="cl-hero__stage" style={{ y: stageY }}>
        <ClayStage markColor="#ECE9F4" coinColor="#6D5BFF" />
      </motion.div>

      {/* A spec callout pointing at the mark */}
      <div className="cl-callout rise" style={{ "--d": "1s" } as React.CSSProperties} aria-hidden="true">
        <span className="cl-callout__tag">[ N°{current.no} ]</span>
        <span className="cl-callout__line" />
        <span className="cl-callout__dot" />
      </div>

      <div className="cl-hero__side wrap">
        <div className="cl-hero__year rise" style={{ "--d": ".6s" } as React.CSSProperties}>
          <span className="cl-year">Y 2026</span>
          <AnimatePresence mode="wait">
            <motion.a
              key={look}
              href="#cl-services"
              className="cl-link"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <small>[{current.no}/03]</small> {current.title} <i />
            </motion.a>
          </AnimatePresence>
          <p className="cl-link__note">{current.note}</p>
        </div>

        <div className="cl-hero__thumbs rise" style={{ "--d": ".7s" } as React.CSSProperties}>
          {LOOKS.map((l, i) => (
            <a
              key={l.no}
              href="#cl-services"
              className={`cl-thumb${i === look ? " is-active" : ""}`}
              onMouseEnter={() => setLook(i)}
              aria-label={l.title}
            >
              <l.Art />
              <span>{l.no}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="cl-hero__foot wrap">
        <p className="cl-hero__statement rise" style={{ "--d": ".8s" } as React.CSSProperties}>
          <span>·</span> Built for <b>startups</b>. Designed for <b>scale</b>. Every credit serves a purpose. Every layer <b>holds up</b>.
        </p>
        <a href="#contact" className="cl-bracket rise" style={{ "--d": ".9s" } as React.CSSProperties}>
          Apply for AWS credits <span aria-hidden="true">⟶</span>
        </a>
      </div>
    </section>
  );
}
