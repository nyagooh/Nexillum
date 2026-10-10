// Brand mark: a cloud split by a curved gap. Two sides, one form.
// Rendered once per page; everything else references these ids via <use>.

export const GAP_PATH = "M772 352 L700 470 C640 560 600 620 560 660 C510 710 485 760 478 850";

export function BrandDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <mask id="nx-gap" maskUnits="userSpaceOnUse" x="200" y="360" width="700" height="500">
          <rect x="200" y="360" width="700" height="500" fill="#fff" />
          <path d={GAP_PATH} fill="none" stroke="#000" strokeWidth="46" />
        </mask>
        <clipPath id="nx-left">
          <path d="M200 340 L784 340 L700 470 C640 560 600 620 560 660 C510 710 485 760 478 850 L200 850 Z" />
        </clipPath>
        <clipPath id="nx-right">
          <path d="M784 340 L900 340 L900 850 L478 850 C485 760 510 710 560 660 C600 620 640 560 700 470 Z" />
        </clipPath>
        <g id="nx-cloud">
          <circle cx="513" cy="550" r="167" />
          <circle cx="340" cy="703" r="120" />
          <circle cx="712" cy="677" r="146" />
          <rect x="340" y="600" width="372" height="223" />
        </g>
        <symbol id="nx-mark" viewBox="218 380 644 446">
          <use href="#nx-cloud" mask="url(#nx-gap)" />
        </symbol>
      </defs>
    </svg>
  );
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href="#nx-mark" />
    </svg>
  );
}
