import { contours } from "d3-contour";
import * as THREE from "three";

// Rebuilds the Nexillum mark (see BrandDefs) as a signed-distance field, then traces its
// outline with marching squares so it can be extruded into 3D. Coordinates are the SVG's.

const CIRCLES = [
  [513, 550, 167],
  [340, 703, 120],
  [712, 677, 146],
] as const;
const RECT = { x0: 340, y0: 600, x1: 712, y1: 823 };
const GAP_HALF_WIDTH = 23;

function cubic(p0: number[], p1: number[], p2: number[], p3: number[], t: number) {
  const u = 1 - t;
  return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]);
}

// The gap's centre line: M772 352 L700 470 C640 560 600 620 560 660 C510 710 485 760 478 850
const GAP: number[][] = (() => {
  const pts: number[][] = [];
  for (let i = 0; i <= 20; i++) pts.push([772 - 72 * (i / 20), 352 + 118 * (i / 20)]);
  for (let i = 1; i <= 60; i++) pts.push(cubic([700, 470], [640, 560], [600, 620], [560, 660], i / 60));
  for (let i = 1; i <= 60; i++) pts.push(cubic([560, 660], [510, 710], [485, 760], [478, 850], i / 60));
  return pts;
})();

function distToGap(x: number, y: number) {
  let best = Infinity;
  for (let i = 0; i < GAP.length - 1; i++) {
    const [ax, ay] = GAP[i];
    const [bx, by] = GAP[i + 1];
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
    best = Math.min(best, Math.hypot(x - ax - t * dx, y - ay - t * dy));
  }
  return best;
}

/** Negative inside the mark, positive outside */
function sdf(x: number, y: number) {
  let d = Infinity;
  for (const [cx, cy, r] of CIRCLES) d = Math.min(d, Math.hypot(x - cx, y - cy) - r);
  const qx = Math.max(RECT.x0 - x, x - RECT.x1, 0);
  const qy = Math.max(RECT.y0 - y, y - RECT.y1, 0);
  const inside = Math.min(Math.max(RECT.x0 - x, x - RECT.x1, RECT.y0 - y, y - RECT.y1), 0);
  d = Math.min(d, Math.hypot(qx, qy) + inside);
  d = Math.max(d, y - 823); // flat base
  return Math.max(d, GAP_HALF_WIDTH - distToGap(x, y));
}

/** Both halves of the mark as THREE shapes, centred on the origin, y up, ~1 unit wide per 640px */
export function markShapes(): THREE.Shape[] {
  const X0 = 200, Y0 = 360, STEP = 3, W = 230, H = 165;
  const values = new Float64Array(W * H);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) values[j * W + i] = -sdf(X0 + i * STEP, Y0 + j * STEP);

  const [multi] = contours().size([W, H]).thresholds([0])(Array.from(values));
  const toV = ([gx, gy]: number[]) => new THREE.Vector2((X0 + gx * STEP - 540) / 640, -(Y0 + gy * STEP - 600) / 640);

  return multi.coordinates.map((polygon) => {
    const shape = new THREE.Shape(polygon[0].map(toV));
    polygon.slice(1).forEach((hole) => shape.holes.push(new THREE.Path(hole.map(toV))));
    return shape;
  });
}
