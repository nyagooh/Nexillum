import { AudienceLink } from "../Audience";
import { ArrowDot } from "../ui";
import { RotatingPill } from "./RotatingPill";
import { TileStrip } from "./TileStrip";

/** A — centred statement, words inside pills, the brand lines rolling through. */
export function HeroPills() {
  return (
    <section className="hero hero--light hp" id="top">
      <svg className="hero__arcs" viewBox="0 0 1000 1000" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx="1000" cy="1000" r={260 + i * 90} />
        ))}
      </svg>

      <div className="hp__body wrap">
        <p className="eyebrow-dot rise" style={{ "--d": "0s" } as React.CSSProperties}>
          <i aria-hidden="true" /> We are Nexillum, a cloud consultancy built from Africa.
        </p>

        <h1 className="hp__title">
          <span className="line"><span style={{ "--d": ".08s" } as React.CSSProperties}>
            Same cloud.{" "}
            <RotatingPill words={["Higher possibilities", "Broader horizons", "More builders"]} className="hpill--ink" />
          </span></span>
          <span className="line"><span style={{ "--d": ".16s" } as React.CSSProperties}>Built from Africa,</span></span>
          <span className="line"><span style={{ "--d": ".24s" } as React.CSSProperties}>
            for <span className="hpill hpill--outline pop">the world.</span>
          </span></span>
        </h1>

        <div className="hp__ctas rise" style={{ "--d": ".4s" } as React.CSSProperties}>
          <AudienceLink audience="founder" className="pill pill--lime pill--lg">
            I’m a founder <ArrowDot />
          </AudienceLink>
          <AudienceLink audience="org" className="pill pill--line pill--lg">
            I’m an organisation <ArrowDot />
          </AudienceLink>
        </div>
      </div>

      <div className="rise" style={{ "--d": ".55s" } as React.CSSProperties}>
        <TileStrip />
      </div>
    </section>
  );
}
