// Clay-style illustrations drawn in SVG. Shapes are flat brand colours; the shared
// #clay filter (BrandDefs) shades them into soft, puffy clay. viewBox is 600×600.

/** The Nexillum mark as a clay object, centred on (cx, cy) at the given width */
export function ClayMark({ cx, cy, w, fill, className }: { cx: number; cy: number; w: number; fill: string; className?: string }) {
  const s = w / 644;
  return (
    <g className={className}>
      <g transform={`translate(${cx - (w / 2)} ${cy - (446 * s) / 2}) scale(${s}) translate(-218 -380)`} filter="url(#clay)">
        <use href="#nx-cloud" mask="url(#nx-gap)" fill={fill} />
      </g>
    </g>
  );
}

export function Shadow({ cx, cy, rx, ry = 22, opacity = 0.28 }: { cx: number; cy: number; rx: number; ry?: number; opacity?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#0b0b20" opacity={opacity} filter="url(#clay-shadow)" />;
}

export function Ball({ cx, cy, r, fill, className }: { cx: number; cy: number; r: number; fill: string; className?: string }) {
  return (
    <g className={className}>
      <circle cx={cx} cy={cy} r={r} fill={fill} filter={r < 30 ? "url(#clay-sm)" : "url(#clay)"} />
    </g>
  );
}

/** Credits: a stack of lime coins with a floating cloud */
export function ClayCredits() {
  const coins = [470, 432, 394, 356];
  return (
    <svg viewBox="0 0 600 600" className="clay" aria-hidden="true">
      <Shadow cx={300} cy={528} rx={170} />
      {coins.map((y, i) => (
        <g key={y} filter="url(#clay)">
          <rect x={175} y={y} width={250} height={36} fill={i % 2 ? "#c6ee3b" : "#D7FF4F"} />
          <ellipse cx={300} cy={y + 36} rx={125} ry={40} fill={i % 2 ? "#c6ee3b" : "#D7FF4F"} />
          <ellipse cx={300} cy={y} rx={125} ry={40} fill="#e4ff86" />
        </g>
      ))}
      <g transform="translate(300 356) scale(1 .32)" opacity=".55">
        <use href="#nx-mark" x={-60} y={-42} width={120} height={84} fill="#9bbf1f" />
      </g>
      <ClayMark cx={300} cy={190} w={250} fill="#F4F1EA" className="clay-float" />
      <Ball cx={120} cy={250} r={24} fill="#E4DEFF" className="clay-float clay-float--slow" />
      <Ball cx={490} cy={140} r={16} fill="#D7FF4F" className="clay-float clay-float--fast" />
    </svg>
  );
}

/** Architecture: stacked server slabs piped to a cloud */
export function ClayArchitecture() {
  const slabs = [
    { y: 430, fill: "#6D5BFF" },
    { y: 352, fill: "#E4DEFF" },
    { y: 274, fill: "#F4F1EA" },
  ];
  return (
    <svg viewBox="0 0 600 600" className="clay" aria-hidden="true">
      <Shadow cx={290} cy={532} rx={180} />
      <path d="M420 300 C 500 300, 500 200, 440 170" fill="none" stroke="#121214" strokeWidth={22} strokeLinecap="round" filter="url(#clay-sm)" />
      {slabs.map((s) => (
        <g key={s.y}>
          <rect x={150} y={s.y} width={280} height={70} rx={30} fill={s.fill} filter="url(#clay)" />
          <circle cx={190} cy={s.y + 35} r={9} fill="#D7FF4F" filter="url(#clay-sm)" />
          <circle cx={222} cy={s.y + 35} r={9} fill={s.fill === "#6D5BFF" ? "#E4DEFF" : "#6D5BFF"} filter="url(#clay-sm)" />
          <rect x={300} y={s.y + 28} width={100} height={14} rx={7} fill={s.fill === "#6D5BFF" ? "#5546d6" : "#d4cdf5"} />
        </g>
      ))}
      <ClayMark cx={400} cy={150} w={200} fill="#6D5BFF" className="clay-float" />
      <Ball cx={120} cy={180} r={30} fill="#121214" className="clay-float clay-float--slow" />
    </svg>
  );
}

/** Scale: rising bars with a ball on top */
export function ClayScale() {
  const bars = [
    { x: 130, h: 110, fill: "#E4DEFF" },
    { x: 220, h: 180, fill: "#8f82ff" },
    { x: 310, h: 260, fill: "#6D5BFF" },
    { x: 400, h: 340, fill: "#D7FF4F" },
  ];
  return (
    <svg viewBox="0 0 600 600" className="clay" aria-hidden="true">
      <Shadow cx={300} cy={528} rx={210} opacity={0.5} />
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y={510 - b.h} width={70} height={b.h} rx={35} fill={b.fill} filter="url(#clay)" />
      ))}
      <Ball cx={435} cy={128} r={40} fill="#F4F1EA" className="clay-bounce" />
      <ClayMark cx={190} cy={170} w={170} fill="#F4F1EA" className="clay-float clay-float--slow" />
    </svg>
  );
}

/** A tower of clay clouds rising toward a lime sun, for tall frames. viewBox 400×700. */
export function ClayTower() {
  return (
    <svg viewBox="0 0 400 700" className="clay" aria-hidden="true">
      <Ball cx={300} cy={110} r={46} fill="#D7FF4F" className="clay-float clay-float--slow" />
      <Ball cx={96} cy={190} r={12} fill="#F4F1EA" className="clay-float clay-float--fast" />
      <Shadow cx={200} cy={668} rx={170} ry={18} opacity={0.35} />
      <ClayMark cx={200} cy={590} w={360} fill="#F4F1EA" />
      <ClayMark cx={190} cy={455} w={290} fill="#E4DEFF" className="clay-float clay-float--slow" />
      <ClayMark cx={210} cy={335} w={220} fill="#F4F1EA" className="clay-float" />
      <ClayMark cx={192} cy={235} w={150} fill="#6D5BFF" className="clay-float clay-float--fast" />
      <Ball cx={330} cy={300} r={18} fill="#6D5BFF" className="clay-float" />
      <Ball cx={70} cy={420} r={22} fill="#D7FF4F" className="clay-float clay-float--slow" />
    </svg>
  );
}
