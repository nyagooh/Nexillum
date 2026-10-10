"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Mark } from "../BrandDefs";
import { Clouds } from "../Clouds";
import { ArrowDot } from "../ui";

/** Sky — full-bleed photograph above the clouds; scrolling flies you up through a cloud layer. */
export function HeroSky() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.3]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fogY = useTransform(scrollYProgress, [0, 1], ["30%", "-60%"]);

  return (
    <section ref={ref} className="hero hero--dark sky" id="top">
      <motion.img className="sky__img" src="/images/above-clouds.jpg" alt="" style={{ scale: imgScale, y: imgY }} />
      <div className="sky__shade" aria-hidden="true" />

      <motion.div className="sky__body wrap" style={{ y: textY, opacity: textFade }}>
        <p className="eyebrow-dot eyebrow-dot--dark rise" style={{ "--d": "0s" } as React.CSSProperties}>
          <i aria-hidden="true" /> AWS credits and cloud for startups
        </p>
        <h1 className="sky__title">
          <span className="line"><span style={{ "--d": ".1s" } as React.CSSProperties}>Same cloud.</span></span>
          <span className="line"><span style={{ "--d": ".2s" } as React.CSSProperties}>Higher <span className="lime">possibilities.</span></span></span>
        </h1>
        <div className="sky__row rise" style={{ "--d": ".4s" } as React.CSSProperties}>
          <p>Activate credits, architecture and engineers for startups building on AWS.</p>
          <div className="hp__ctas hp__ctas--left">
            <a href="#contact" className="pill pill--lime pill--lg">Apply for AWS credits <ArrowDot /></a>
            <a href="#services" className="pill pill--glass pill--lg">Our services <ArrowDot /></a>
          </div>
        </div>
      </motion.div>

      <div className="sky__card rise" style={{ "--d": ".6s" } as React.CSSProperties}>
        <span className="sky__card-mark"><Mark /></span>
        <div>
          <p className="mono">Startup programme</p>
          <p className="sky__card-title">Credits, architecture review and build support</p>
        </div>
      </div>

      <motion.div className="sky__fog" style={{ y: fogY }} aria-hidden="true">
        <Clouds tone="white" set="hero" />
      </motion.div>

      <p className="sky__caption mono">01 — More room to build</p>
    </section>
  );
}
