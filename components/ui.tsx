/** "● {01} — Services" section label */
export function SectionLabel({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <p className="label">
      <i aria-hidden="true" />
      {`{${no}}`} — {children}
    </p>
  );
}

/** Circular ↗ badge used inside pills and tiles */
export function ArrowDot({ dir = "ne" }: { dir?: "ne" | "up" | "se" }) {
  const rotate = { ne: 0, up: -45, se: 90 }[dir];
  return (
    <span className="arrow-dot" aria-hidden="true">
      <svg viewBox="0 0 16 16" style={{ transform: `rotate(${rotate}deg)` }}>
        <path d="M5 11 L11 5 M6 5 H11 V10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
