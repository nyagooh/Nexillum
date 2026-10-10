import { Mark } from "../BrandDefs";
import { NairobiClock } from "../NairobiClock";

// Code-drawn tiles standing in for photography. Swap any tile for an <img> later.
function Tiles() {
  return (
    <>
      <div className="tile tile--violet">
        <Mark className="tile__mark" />
        <span className="tile__cap mono">01 / Same cloud</span>
      </div>

      <div className="tile tile--term">
        <div className="term-dots"><i /><i /><i /></div>
        <pre className="mono-pre">
          <span className="dim">$</span> nexillum init --region af-south-1{"\n"}
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

      <div className="tile tile--lilac">
        <span className="tile__coords">1.2921° S<br />36.8219° E</span>
        <span className="tile__cap mono">Nairobi · <NairobiClock /> EAT</span>
      </div>

      <div className="tile tile--stripes">
        <svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <path
              key={i}
              d={`M-10 ${30 + i * 11} C 120 ${-10 + i * 11}, 220 ${190 + i * 11}, 410 ${90 + i * 11}`}
              stroke={i === 8 ? "#6D5BFF" : i === 12 ? "#D7FF4F" : "#F4F1EA"}
              strokeWidth={i === 8 || i === 12 ? 4 : 1.4}
              fill="none"
            />
          ))}
        </svg>
        <span className="tile__cap mono">Build beyond borders</span>
      </div>

      <div className="tile tile--poster">
        <span className="tile__poster">Africa<br />↔ World</span>
        <span className="tile__cap mono">Different contexts. Shared ambition.</span>
      </div>
    </>
  );
}

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
