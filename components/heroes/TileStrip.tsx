import { Mark } from "../BrandDefs";

function Photo({ src, caption, wide }: { src: string; caption: string; wide?: boolean }) {
  return (
    <div className={`tile tile--photo${wide ? " tile--wide" : ""}`}>
      <img src={src} alt="" loading="lazy" decoding="async" />
      <span className="tile__cap mono">{caption}</span>
    </div>
  );
}

function Tiles() {
  return (
    <>
      <div className="tile tile--violet">
        <Mark className="tile__mark" />
        <span className="tile__cap mono">01 / Same cloud</span>
      </div>

      <Photo src="/images/wing.jpg" caption="Higher possibilities" wide />

      <div className="tile tile--term">
        <div className="term-dots"><i /><i /><i /></div>
        <pre className="mono-pre">
          <span className="dim">$</span> nexillum init --region us-east-1{"\n"}
          <span className="ok">✓</span> landing zone ready{"\n"}
          <span className="ok">✓</span> guardrails · budgets · SSO{"\n"}
          <span className="dim">$</span> nexillum credits apply{"\n"}
          <span className="ok">→</span> AWS Activate: submitted
        </pre>
      </div>

      <div className="tile tile--lime">
        <span className="tile__big">Credits.</span>
        <span className="tile__cap mono">AWS Activate support</span>
        <Mark className="tile__corner" />
      </div>

      <Photo src="/images/code-laptop.jpg" caption="Ship faster" />
      <Photo src="/images/above-clouds.jpg" caption="More room to build" wide />
      <Photo src="/images/workspace.jpg" caption="Your cloud partner from day one" />
    </>
  );
}

/** A slow marquee of brand tiles and photography. Rendered twice for a seamless loop. */
export function TileStrip() {
  return (
    <div className="tiles" aria-hidden="true">
      <div className="tiles__track">
        <Tiles />
        <Tiles />
      </div>
    </div>
  );
}
