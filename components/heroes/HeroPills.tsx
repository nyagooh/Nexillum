import { Clouds } from "../Clouds";
import { ArrowDot } from "../ui";
import { RotatingPill } from "./RotatingPill";
import { TileStrip } from "./TileStrip";

/** A — centred statement, words inside pills, the brand lines rolling through. */
export function HeroPills() {
  return (
    <section className="hero hero--light hp" id="top">
      <Clouds set="hero" />

      <div className="hp__body wrap">
        <p className="eyebrow-dot rise" style={{ "--d": "0s" } as React.CSSProperties}>
          <i aria-hidden="true" /> We are Nexillum, the cloud partner for startups.
        </p>

        <h1 className="hp__title">
          <span className="line"><span style={{ "--d": ".08s" } as React.CSSProperties}>
            Same cloud.{" "}
            <RotatingPill words={["Higher possibilities", "More room to build", "More builders"]} className="hpill--ink" />
          </span></span>
          <span className="line"><span style={{ "--d": ".16s" } as React.CSSProperties}>AWS credits and cloud</span></span>
          <span className="line"><span style={{ "--d": ".24s" } as React.CSSProperties}>
            services for <span className="hpill hpill--outline pop">startups.</span>
          </span></span>
        </h1>

        <div className="hp__ctas rise" style={{ "--d": ".4s" } as React.CSSProperties}>
          <a href="#contact" className="pill pill--lime pill--lg">Apply for AWS credits <ArrowDot /></a>
          <a href="#contact" className="pill pill--line pill--lg">Talk to an engineer <ArrowDot /></a>
        </div>
      </div>

      <div className="rise" style={{ "--d": ".55s" } as React.CSSProperties}>
        <TileStrip />
      </div>
    </section>
  );
}
