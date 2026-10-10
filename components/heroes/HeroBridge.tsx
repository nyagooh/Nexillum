import { AudienceLink } from "../Audience";
import { ArrowDot } from "../ui";

// Nairobi at the base; arcs fan out to the world. Lime travels out, violet travels in.
const HUB = { x: 600, y: 470 };
const CITIES = [
  { name: "São Paulo", x: 90, y: 360 },
  { name: "New York", x: 200, y: 170 },
  { name: "London", x: 430, y: 70 },
  { name: "Dubai", x: 770, y: 80 },
  { name: "Mumbai", x: 990, y: 180 },
  { name: "Singapore", x: 1110, y: 360 },
];

const arc = (c: { x: number; y: number }) => {
  const mx = (HUB.x + c.x) / 2;
  const my = Math.min(HUB.y, c.y) - 120;
  return `M${HUB.x} ${HUB.y} Q${mx} ${my} ${c.x} ${c.y}`;
};

/** B — Africa ↔ World with a live route map of two-way traffic. */
export function HeroBridge() {
  return (
    <section className="hero hero--light hb" id="top">
      <div className="hb__body wrap">
        <p className="eyebrow-dot rise" style={{ "--d": "0s" } as React.CSSProperties}>
          <i aria-hidden="true" /> Global capacity in. African ambition out.
        </p>
        <h1 className="hb__title">
          <span className="line"><span style={{ "--d": ".08s" } as React.CSSProperties}>
            Africa <span className="hpill hpill--violet hb__swap pop" aria-label="to and from">
              <span>↔</span>
            </span> World
          </span></span>
        </h1>
        <p className="hb__sub rise" style={{ "--d": ".25s" } as React.CSSProperties}>
          Different contexts. Shared ambition. Cloud, AI and engineering capacity moving both ways.
        </p>
        <div className="hp__ctas rise" style={{ "--d": ".35s" } as React.CSSProperties}>
          <AudienceLink audience="founder" className="pill pill--lime pill--lg">I’m a founder <ArrowDot /></AudienceLink>
          <AudienceLink audience="org" className="pill pill--line pill--lg">I’m an organisation <ArrowDot /></AudienceLink>
        </div>
      </div>

      <svg className="hb__map" viewBox="0 0 1200 520" aria-hidden="true">
        {CITIES.map((c, i) => {
          const d = arc(c);
          return (
            <g key={c.name}>
              <path className="hb__arc" d={d} pathLength={1} style={{ animationDelay: `${0.4 + i * 0.12}s` }} />
              <circle r="5" className="hb__out">
                <animateMotion dur={`${3.2 + i * 0.3}s`} begin={`${1 + i * 0.2}s`} repeatCount="indefinite" path={d} />
              </circle>
              <circle r="4" className="hb__in">
                <animateMotion dur={`${3.6 + i * 0.25}s`} begin={`${1.6 + i * 0.2}s`} repeatCount="indefinite" path={d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
              </circle>
              <circle cx={c.x} cy={c.y} r="5" className="hb__node" />
              <text x={c.x} y={c.y - 16} textAnchor="middle" className="hb__city">{c.name.toUpperCase()}</text>
            </g>
          );
        })}
        <circle cx={HUB.x} cy={HUB.y} r="26" className="hb__pulse" />
        <circle cx={HUB.x} cy={HUB.y} r="9" className="hb__hub" />
        <text x={HUB.x} y={HUB.y + 38} textAnchor="middle" className="hb__city hb__city--hub">NAIROBI · 1.2921° S</text>
      </svg>
    </section>
  );
}
