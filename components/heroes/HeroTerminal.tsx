"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { AudienceLink } from "../Audience";
import { ArrowDot } from "../ui";
import { RotatingPill } from "./RotatingPill";

type Line = { t: "cmd" | "ok" | "info"; s: string };

const SCRIPT: Line[] = [
  { t: "cmd", s: "nexillum onboard --startup your-startup" },
  { t: "info", s: "reviewing architecture… plan ready" },
  { t: "ok", s: "landing zone: af-south-1 (Cape Town)" },
  { t: "ok", s: "guardrails: budgets · SSO · backups" },
  { t: "cmd", s: "nexillum credits apply --program activate" },
  { t: "ok", s: "application prepared and submitted" },
  { t: "cmd", s: "nexillum deploy --env production" },
  { t: "ok", s: "live. same cloud, higher possibilities." },
];

/** Types the script one character at a time, then loops. */
function useTypedScript(reduce: boolean | null) {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const current = SCRIPT[line];
    const done = chars >= current.s.length;
    const last = line === SCRIPT.length - 1;
    const delay = !done ? (current.t === "cmd" ? 38 : 12) : last ? 3200 : current.t === "cmd" ? 420 : 260;
    const id = setTimeout(() => {
      if (!done) setChars((c) => c + 1);
      else if (last) { setLine(0); setChars(0); }
      else { setLine((l) => l + 1); setChars(0); }
    }, delay);
    return () => clearTimeout(id);
  }, [line, chars, reduce]);

  return reduce ? { line: SCRIPT.length - 1, chars: Infinity } : { line, chars };
}

/** D — founder-facing: a statement beside a live onboarding terminal. */
export function HeroTerminal() {
  const reduce = useReducedMotion();
  const { line, chars } = useTypedScript(reduce);

  return (
    <section className="hero hero--light ht" id="top">
      <div className="ht__grid wrap">
        <div>
          <p className="eyebrow-dot rise" style={{ "--d": "0s" } as React.CSSProperties}>
            <i aria-hidden="true" /> AWS cloud and credits for African startups
          </p>
          <h1 className="ht__title">
            <span className="line"><span style={{ "--d": ".08s" } as React.CSSProperties}>Your cloud partner</span></span>
            <span className="line"><span style={{ "--d": ".16s" } as React.CSSProperties}>
              <RotatingPill words={["from day one.", "at every stage.", "beyond borders."]} className="hpill--violet" />
            </span></span>
          </h1>
          <p className="ht__sub rise" style={{ "--d": ".3s" } as React.CSSProperties}>
            Architecture reviews, AWS Activate credit support and hands-on engineering, from first commit to regional scale.
          </p>
          <div className="hp__ctas hp__ctas--left rise" style={{ "--d": ".4s" } as React.CSSProperties}>
            <AudienceLink audience="founder" className="pill pill--lime pill--lg">Apply as a founder <ArrowDot /></AudienceLink>
            <AudienceLink audience="org" className="pill pill--line pill--lg">For organisations <ArrowDot /></AudienceLink>
          </div>
        </div>

        <div className="term rise" style={{ "--d": ".35s" } as React.CSSProperties} aria-hidden="true">
          <div className="term__bar">
            <div className="term-dots"><i /><i /><i /></div>
            <span className="mono">nexillum — zsh</span>
          </div>
          <pre className="term__body">
            {SCRIPT.slice(0, line + 1).map((l, i) => {
              const text = i === line ? l.s.slice(0, chars) : l.s;
              return (
                <div key={i} className={`term__line term__line--${l.t}`}>
                  <span className="term__pfx">{l.t === "cmd" ? "$" : l.t === "ok" ? "✓" : "·"}</span>
                  {text}
                  {i === line && <span className="term__caret" />}
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </section>
  );
}
