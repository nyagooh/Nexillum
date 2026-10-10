"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AudienceLink } from "./Audience";
import { SectionLabel } from "./ui";

const STEPS = [
  {
    tag: "Apply",
    line: "Tell us what you’re building and where it runs today.",
    more: "A short form about your product, your stack and where you want to be in a year.",
  },
  {
    tag: "Architecture review",
    line: "A working session with one of our engineers.",
    more: "We map your current setup, risks and costs. You leave with a written plan you can act on with or without us.",
  },
  {
    tag: "Credits",
    line: "We prepare and support your AWS Activate application.",
    more: "Eligibility checks, application support, and a plan for spending credits on what actually moves the product.",
  },
  {
    tag: "Build",
    line: "Hands-on help to ship on a solid foundation.",
    more: "Landing zone, CI/CD, observability and security guardrails, set up alongside your team so you own them.",
  },
  {
    tag: "Scale",
    line: "Support as you grow, go regional and go global.",
    more: "Cost reviews, performance work and introductions across the bridge when you’re ready for new markets.",
  },
];

export function HowItWorks() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section section--dark" id="how">
      <div className="wrap">
        <div className="reveal">
          <SectionLabel no="03">Founder programme</SectionLabel>
          <h2 className="h2 h2--xl">How it works</h2>
        </div>

        <ol className="acc">
          {STEPS.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.tag} className={`acc__row reveal${isOpen ? " is-open" : ""}`}>
                <button className="acc__head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="acc__tag">{s.tag}</span>
                  <span className="acc__no">/{String(i + 1).padStart(2, "0")}</span>
                  <span className="acc__line">{s.line}</span>
                  <span className="acc__plus" aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="acc__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.1, 1] }}
                    >
                      <p>{s.more}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        <div className="accel reveal">
          <span className="mono accel__badge">Coming soon</span>
          <p><strong>Nexillum Startup Accelerator.</strong> A cohort programme for African cloud-native founders.</p>
          <AudienceLink audience="founder" className="link-arrow link-arrow--light">Get notified →</AudienceLink>
        </div>
      </div>
    </section>
  );
}
