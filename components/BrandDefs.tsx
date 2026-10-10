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
        {/* Clay: blur the silhouette into a height map, light it, add a soft highlight */}
        {[
          { id: "clay", blur: 12, depth: 9 },
          { id: "clay-sm", blur: 5, depth: 5 },
        ].map((f) => (
          <filter key={f.id} id={f.id} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation={f.blur} result="h" />
            <feDiffuseLighting in="h" surfaceScale={f.depth} diffuseConstant="1.25" lightingColor="#fff" result="d">
              <feDistantLight azimuth="225" elevation="52" />
            </feDiffuseLighting>
            <feComposite in="SourceGraphic" in2="d" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="shade" />
            <feSpecularLighting in="h" surfaceScale={f.depth} specularConstant=".5" specularExponent="24" lightingColor="#fff" result="s">
              <feDistantLight azimuth="225" elevation="58" />
            </feSpecularLighting>
            <feComposite in="s" in2="SourceAlpha" operator="in" result="s2" />
            <feComposite in="shade" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".6" k4="0" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>
        ))}
        <filter id="clay-shadow" x="-30%" y="-100%" width="160%" height="300%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
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
