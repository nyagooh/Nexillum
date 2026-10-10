"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { markShapes } from "./markShape";

type Props = {
  className?: string;
  /** Background: transparent lets the section's own gradient show through */
  markColor?: string;
  coinColor?: string;
};

const LIME = "#D7FF4F";
const LILAC = "#E4DEFF";
const WHITE = "#F4F1EA";

function clay(color: string) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0 });
}

/** A coin with soft, rounded edges, drawn as a lathe profile */
function coinGeometry(r = 0.17, h = 0.06) {
  const pts: THREE.Vector2[] = [new THREE.Vector2(0, -h / 2)];
  const bevel = h * 0.5;
  for (let i = 0; i <= 10; i++) {
    const a = -Math.PI / 2 + (i / 10) * Math.PI;
    pts.push(new THREE.Vector2(r - bevel + Math.cos(a) * bevel, Math.sin(a) * (h / 2)));
  }
  pts.push(new THREE.Vector2(0, h / 2));
  return new THREE.LatheGeometry(pts, 48);
}

/**
 * A real-time 3D clay scene: the Nexillum mark extruded with deep rounded bevels,
 * orbited by lime coins and soft spheres. Leans toward the cursor; pauses offscreen.
 */
export function ClayStage({ className = "", markColor = "#6D5BFF", coinColor = LIME }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // No WebGL: the section's background stands on its own
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0.15, 4.4);

    // Soft studio light: a warm key from top-left, cool fill, gentle bounce
    scene.add(new THREE.HemisphereLight("#ffffff", "#5a4fc7", 1.1));
    const key = new THREE.DirectionalLight("#fff6ea", 2.4);
    key.position.set(-2.5, 3.5, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.radius = 8;
    key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3;
    scene.add(key);
    const rim = new THREE.DirectionalLight("#cfc8ff", 1.2);
    rim.position.set(3, 1, -2);
    scene.add(rim);

    // The mark
    const rig = new THREE.Group();
    scene.add(rig);
    const markGroup = new THREE.Group();
    const markMat = clay(markColor);
    markShapes().forEach((shape) => {
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.08, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.06, bevelSegments: 12, curveSegments: 24,
      });
      geo.translate(0, 0, -0.04);
      const mesh = new THREE.Mesh(geo, markMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      markGroup.add(mesh);
    });
    markGroup.scale.setScalar(1.45);
    rig.add(markGroup);

    // Orbiting coins and spheres
    const orbit = new THREE.Group();
    rig.add(orbit);
    const coinGeo = coinGeometry();
    const coins = [0, 1, 2].map((i) => {
      const c = new THREE.Mesh(coinGeo, clay(coinColor));
      c.castShadow = true;
      orbit.add(c);
      return { mesh: c, phase: (i / 3) * Math.PI * 2 };
    });
    const ballGeo = new THREE.SphereGeometry(1, 48, 48);
    const balls = [
      { color: LILAC, r: 0.14, pos: [-1.35, 0.75, 0.2] },
      { color: WHITE, r: 0.09, pos: [1.3, -0.55, 0.5] },
      { color: LIME, r: 0.06, pos: [0.95, 0.85, -0.2] },
    ].map((b) => {
      const m = new THREE.Mesh(ballGeo, clay(b.color));
      m.scale.setScalar(b.r);
      m.position.set(b.pos[0], b.pos[1], b.pos[2]);
      m.castShadow = true;
      rig.add(m);
      return { mesh: m, base: m.position.y };
    });

    // Shadow catcher
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.ShadowMaterial({ opacity: 0.22 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.05;
    floor.receiveShadow = true;
    scene.add(floor);

    // Sizing
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w / h < 1 ? 6 : 4.4;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // Pointer lean
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);

    // Run only while visible
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = reduce ? 0 : clock.getElapsedTime();
      rig.rotation.y += ((target.x * 0.35 + Math.sin(t * 0.4) * 0.25) - rig.rotation.y) * 0.05;
      rig.rotation.x += ((target.y * 0.15) - rig.rotation.x) * 0.05;
      markGroup.position.y = 0.08 + Math.sin(t * 0.9) * 0.06;
      coins.forEach(({ mesh, phase }) => {
        const a = t * 0.6 + phase;
        mesh.position.set(Math.cos(a) * 1.25, -0.5 + Math.sin(a * 2) * 0.12, Math.sin(a) * 0.55);
        mesh.rotation.set(Math.PI / 2.6 + Math.sin(a) * 0.4, 0, a * 0.8);
      });
      balls.forEach(({ mesh, base }, i) => { mesh.position.y = base + Math.sin(t * (0.8 + i * 0.3) + i) * 0.08; });
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [markColor, coinColor]);

  return <div ref={ref} className={`clay-stage ${className}`} aria-hidden="true" />;
}
