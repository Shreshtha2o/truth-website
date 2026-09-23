"use client";

import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";

const PARTICLE_COUNT = 100_000;
const smoothMorph = (x:number) => { const t=Math.max(0,Math.min(1,x)); return t*t*(3-2*t); };
const SOURCE = "/images/ap-particles-source.png";
const KRISHNA_SOURCE = "/images/krishna-particles-source.png";
const EARTH_SOURCE = "/images/earth-particles-source.png";
const NATURE_SOURCE = "/images/nature-particles-source.png";
const UNIVERSE_SOURCE = "/images/universe-particles-source.png";
const EYE_SOURCE = "/images/eye-particles-source.png";
const BRAIN_SOURCE = "/images/brain-particles-source.png";

// One shared timeline drives BOTH particles and sharp image layers.
// This prevents the image from advancing on raw scroll while particles are still easing.
const journeyState = {
  intro: 0,
  progresses: [0, 0, 0, 0, 0, 0],
  allTargetsReady: false,
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const ease = (v: number) => { const x = clamp01(v); return x * x * (3 - 2 * x); };
const smoother = (v: number) => { const x = clamp01(v); return x * x * x * (x * (x * 6 - 15) + 10); };
const fadeOutFast = (v: number) => { const x = clamp01(v); return 1 - Math.pow(1 - x, 3.2); };
const hash01 = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123; return x - Math.floor(x); };
const hashSigned = (n: number) => hash01(n) * 2 - 1;

function UniverseDecor() {
  const field = useRef<THREE.Points>(null);
  const dust = useRef<THREE.Points>(null);
  const ringA = useRef<THREE.Points>(null);
  const ringB = useRef<THREE.Points>(null);
  const orb = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const data = useMemo(() => {
    const palette = [
      new THREE.Color("#67e8ff"), new THREE.Color("#a88cff"),
      new THREE.Color("#ff72ad"), new THREE.Color("#ffd15c"),
      new THREE.Color("#55efc4"), new THREE.Color("#7fb8ff"),
      new THREE.Color("#ff7a5c"), new THREE.Color("#c9ff66"),
    ];
    const makeField = (count: number, spreadX: number, spreadY: number, depth: number, seedOffset: number) => {
      const pos = new Float32Array(count * 3), col = new Float32Array(count * 3), sz = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const p = i * 3;
        pos[p] = hashSigned(i * 2.31 + seedOffset) * spreadX;
        pos[p + 1] = hashSigned(i * 4.91 + seedOffset + 17) * spreadY;
        pos[p + 2] = hashSigned(i * 7.13 + seedOffset + 31) * depth;
        const c = palette[Math.floor(hash01(i * 9.7 + seedOffset) * palette.length)];
        col[p] = c.r; col[p + 1] = c.g; col[p + 2] = c.b;
        sz[i] = .20 + Math.pow(hash01(i * 8.3 + seedOffset), 2.45) * 1.15;
      }
      return { pos, col, sz };
    };
    const makeRing = (count: number, radius: number, tilt: number, phase: number) => {
      const p = new Float32Array(count * 3), c = new Float32Array(count * 3), s = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const a = i / count * Math.PI * 2 + phase, wobble = 1 + Math.sin(a * 5 + phase) * .025, q = i * 3;
        const x = Math.cos(a) * radius * wobble, y = Math.sin(a) * radius * .42 * wobble, z = Math.sin(a) * radius * .50;
        p[q] = x; p[q + 1] = y * Math.cos(tilt) - z * Math.sin(tilt); p[q + 2] = y * Math.sin(tilt) + z * Math.cos(tilt);
        const cc = palette[i % palette.length];
        c[q] = cc.r; c[q + 1] = cc.g; c[q + 2] = cc.b; s[i] = .18 + hash01(i * 3.7) * .82;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(p, 3)); g.setAttribute("color", new THREE.BufferAttribute(c, 3)); g.setAttribute("aSize", new THREE.BufferAttribute(s, 1));
      return g;
    };
    const makeOrb = (count: number) => {
      const p = new Float32Array(count * 3), c = new Float32Array(count * 3), s = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const a = hash01(i * 3.2) * Math.PI * 2, r = Math.pow(hash01(i * 5.7), .58) * .26, q = i * 3;
        p[q] = Math.cos(a) * r; p[q + 1] = Math.sin(a) * r * .72; p[q + 2] = hashSigned(i * 7.4) * .11;
        const cc = palette[Math.floor(hash01(i * 4.1) * palette.length)];
        c[q] = cc.r; c[q + 1] = cc.g; c[q + 2] = cc.b; s[i] = .18 + hash01(i * 9.2) * .9;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(p, 3)); g.setAttribute("color", new THREE.BufferAttribute(c, 3)); g.setAttribute("aSize", new THREE.BufferAttribute(s, 1));
      return g;
    };
    return {
      field: makeField(3500, 3.2, 1.8, .9, 11),
      dust: makeField(1200, 3.8, 2.15, 1.15, 911),
      ringA: makeRing(300, .58, .52, .3), ringB: makeRing(250, .82, -.64, 1.9), orb: makeOrb(500),
    };
  }, []);

  const fieldGeometry = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(data.field.pos, 3)); g.setAttribute("color", new THREE.BufferAttribute(data.field.col, 3)); g.setAttribute("aSize", new THREE.BufferAttribute(data.field.sz, 1)); return g; }, [data]);
  const dustGeometry = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(data.dust.pos, 3)); g.setAttribute("color", new THREE.BufferAttribute(data.dust.col, 3)); g.setAttribute("aSize", new THREE.BufferAttribute(data.dust.sz, 1)); return g; }, [data]);

  useFrame((state) => {
    const t = state.clock.elapsedTime, px = pointer.x, py = pointer.y;
    if (field.current) { field.current.position.x += (px * .055 - field.current.position.x) * .025; field.current.position.y += (py * .035 - field.current.position.y) * .025; field.current.rotation.z = t * .014; field.current.rotation.y = t * .009; }
    if (dust.current) { dust.current.position.x += (-px * .11 - dust.current.position.x) * .025; dust.current.position.y += (-py * .08 - dust.current.position.y) * .025; dust.current.rotation.z = -t * .011; }
    if (ringA.current) { ringA.current.position.x += (-1.42 + px * .18 - ringA.current.position.x) * .035; ringA.current.position.y += (.40 + py * .10 - ringA.current.position.y) * .035; ringA.current.rotation.z = t * .11; ringA.current.rotation.x = Math.sin(t * .2) * .18 + py * .1; }
    if (ringB.current) { ringB.current.position.x += (-1.62 + px * .15 - ringB.current.position.x) * .03; ringB.current.position.y += (-.45 + py * .09 - ringB.current.position.y) * .03; ringB.current.rotation.z = -t * .08; ringB.current.rotation.y = Math.sin(t * .22) * .22 + px * .12; }
    if (orb.current) { orb.current.position.x += (-1.48 + px * .13 - orb.current.position.x) * .03; orb.current.position.y += (-.02 + py * .13 - orb.current.position.y) * .03; orb.current.rotation.z = t * .15; orb.current.rotation.y = -t * .18; }
  });

  const mat = { transparent: true, opacity: .92, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending } as const;
  return <>
    <points ref={field} geometry={fieldGeometry}><pointsMaterial size={.0058} {...mat} opacity={.78} /></points>
    <points ref={dust} geometry={dustGeometry}><pointsMaterial size={.0035} {...mat} opacity={.22} /></points>
    <points ref={ringA} geometry={data.ringA}><pointsMaterial size={.0058} {...mat} opacity={.66} /></points>
    <points ref={ringB} geometry={data.ringB}><pointsMaterial size={.0052} {...mat} opacity={.58} /></points>
    <points ref={orb} geometry={data.orb}><pointsMaterial size={.0058} {...mat} opacity={.62} /></points>
  </>;
}

function CursorUniverse() {
  const group = useRef<THREE.Group>(null); const { pointer, size } = useThree();
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime, aspect = size.width / Math.max(size.height, 1);
    const tx = -Math.max(1.05, aspect * .72) + pointer.x * .12, ty = .28 + pointer.y * .22;
    group.current.position.x += (tx - group.current.position.x) * .05; group.current.position.y += (ty - group.current.position.y) * .05;
    group.current.rotation.y = t * .17 + pointer.x * .08; group.current.rotation.x = Math.sin(t * .45) * .07 + pointer.y * .08;
  });
  return <group ref={group}>
    <mesh position={[0,.12,0]}><torusGeometry args={[.058,.007,7,28]}/><meshBasicMaterial color="#ff4f6d" transparent opacity={.62}/></mesh>
    <mesh position={[.11,-.01,-.03]} rotation={[.6,.2,.2]}><icosahedronGeometry args={[.036,1]}/><meshBasicMaterial color="#6ee8ff" wireframe transparent opacity={.68}/></mesh>
  </group>;
}

function sampleImage(image: HTMLImageElement, target: Float32Array, colors: Float32Array, displayHeight: number, xShift: number, yShift: number, options?: { alphaOnly?: boolean; brightnessThreshold?: number }) {
  const canvas = document.createElement("canvas"), w = image.naturalWidth || image.width, h = image.naturalHeight || image.height;
  canvas.width = w; canvas.height = h; const ctx = canvas.getContext("2d", { willReadFrequently: true }); if (!ctx) return false;
  ctx.drawImage(image, 0, 0, w, h); const px = ctx.getImageData(0, 0, w, h).data;
  // IMPORTANT: map particles to the FULL image canvas, not the alpha bounding box.
  // This makes the particle target occupy exactly the same visual rectangle as the
  // sharp <img> layer, including transparent padding around cutouts.
  let hasVisible = false;
  for (let y = 0; y < h && !hasVisible; y += 4) for (let x = 0; x < w; x += 4) {
    const q = (y * w + x) * 4, alpha = px[q + 3], brightness = (px[q] + px[q + 1] + px[q + 2]) / 3;
    if (alpha > 20 && (!options?.brightnessThreshold || brightness > options.brightnessThreshold)) { hasVisible = true; break; }
  }
  if (!hasVisible) return false;
  const cx = w * .5, cy = h * .5, scale = displayHeight / Math.max(1, h);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let found = false, x = 0, y = 0;
    for (let q = 0; q < 18 && !found; q++) {
      const sx = Math.floor(hash01(i * 13.7 + q * 71.3) * w);
      const sy = Math.floor(hash01(i * 17.9 + q * 37.1) * h);
      const ix = Math.max(0, Math.min(w - 1, sx)), iy = Math.max(0, Math.min(h - 1, sy)), idx = (iy * w + ix) * 4;
      const alpha = px[idx + 3], brightness = (px[idx] + px[idx + 1] + px[idx + 2]) / 3;
      if (alpha > 20 && (!options?.brightnessThreshold || brightness > options.brightnessThreshold)) { x = ix; y = iy; found = true; }
    }
    if (!found) { x = Math.floor(hash01(i * 3.2) * w); y = Math.floor(hash01(i * 5.2) * h); }
    const idx = (y * w + x) * 4, p = i * 3;
    target[p] = (x - cx) * scale + xShift; target[p + 1] = -(y - cy) * scale + yShift; target[p + 2] = hashSigned(i * 1.37 + 3) * .025;
    colors[p] = px[idx] / 255; colors[p + 1] = px[idx + 1] / 255; colors[p + 2] = px[idx + 2] / 255;
  }
  return true;
}


function sampleAlphaWeightedImage(image: HTMLImageElement, target: Float32Array, colors: Float32Array, displayHeight: number, xShift: number, yShift: number) {
  const canvas = document.createElement("canvas");
  const w = image.naturalWidth || image.width, h = image.naturalHeight || image.height;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  ctx.drawImage(image, 0, 0, w, h);
  const px = ctx.getImageData(0, 0, w, h).data;

  // Nature is a transparent cutout. Build the distribution from actual alpha,
  // then reject transparent jitter samples so thin branches/ears/limbs do not
  // turn into holes when the 100k particles converge.
  const gridW = Math.min(640, w);
  const gridH = Math.max(1, Math.round(gridW * h / w));
  const cumulative = new Float64Array(gridW * gridH);
  let total = 0;
  for (let gy = 0; gy < gridH; gy++) {
    const iy = Math.min(h - 1, Math.floor(((gy + .5) / gridH) * h));
    for (let gx = 0; gx < gridW; gx++) {
      const ix = Math.min(w - 1, Math.floor(((gx + .5) / gridW) * w));
      const q = (iy * w + ix) * 4;
      const a = px[q + 3] / 255;
      // Small baseline prevents broad opaque regions from completely starving
      // small but important structures; alpha remains the dominant signal.
      const weight = 0.002 + Math.pow(a, 1.15);
      total += weight;
      cumulative[gy * gridW + gx] = total;
    }
  }
  if (total <= 0) return false;

  const pickCell = (seed: number) => {
    const needle = hash01(seed) * total;
    let lo = 0, hi = cumulative.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cumulative[mid] < needle) lo = mid + 1; else hi = mid;
    }
    return lo;
  };

  const cx = w * .5, cy = h * .5, scale = displayHeight / Math.max(1, h);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const cell = pickCell(i * 29.17 + 91.73);
    const gx = cell % gridW, gy = Math.floor(cell / gridW);
    let x = 0, y = 0, found = false;

    // Sample inside the selected cell and require visible alpha. This is more
    // reliable for Nature's fine transparent edges than accepting a transparent
    // jittered pixel from an opaque-weighted cell.
    const cellX0 = gx / gridW, cellX1 = (gx + 1) / gridW;
    const cellY0 = gy / gridH, cellY1 = (gy + 1) / gridH;
    for (let attempt = 0; attempt < 10 && !found; attempt++) {
      const u = cellX0 + (cellX1 - cellX0) * hash01(i * 7.31 + attempt * 101.7 + 2.7);
      const v = cellY0 + (cellY1 - cellY0) * hash01(i * 11.93 + attempt * 71.1 + 8.4);
      const ix = Math.min(w - 1, Math.max(0, Math.floor(u * w)));
      const iy = Math.min(h - 1, Math.max(0, Math.floor(v * h)));
      const q = (iy * w + ix) * 4;
      if (px[q + 3] > 20) { x = ix; y = iy; found = true; }
    }

    if (!found) {
      // Deterministic global rejection fallback. It is rarely reached, but keeps
      // every particle on visible artwork rather than transparent canvas space.
      for (let attempt = 0; attempt < 24 && !found; attempt++) {
        const ix = Math.floor(hash01(i * 3.91 + attempt * 47.2 + 12.1) * w);
        const iy = Math.floor(hash01(i * 5.73 + attempt * 31.6 + 41.8) * h);
        if (px[(iy * w + ix) * 4 + 3] > 20) { x = ix; y = iy; found = true; }
      }
    }

    const q = (y * w + x) * 4, p = i * 3;
    target[p] = (x - cx) * scale + xShift;
    target[p + 1] = -(y - cy) * scale + yShift;
    target[p + 2] = hashSigned(i * 1.37 + 3) * .025;
    colors[p] = px[q] / 255;
    colors[p + 1] = px[q + 1] / 255;
    colors[p + 2] = px[q + 2] / 255;
  }
  return true;
}

function sampleWeightedImage(image: HTMLImageElement, target: Float32Array, colors: Float32Array, displayHeight: number, xShift: number, yShift: number) {
  const canvas = document.createElement("canvas");
  const w = image.naturalWidth || image.width, h = image.naturalHeight || image.height;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  ctx.drawImage(image, 0, 0, w, h);
  const px = ctx.getImageData(0, 0, w, h).data;

  // The eye/brain artwork contains intentional black negative space. Uniform
  // sampling would waste most of the 100k particles there, so build a weighted
  // distribution that strongly favours the illuminated subject while retaining
  // a small amount of the surrounding atmosphere.
  const gridW = 320, gridH = Math.max(1, Math.round(gridW * h / w));
  const cumulative = new Float64Array(gridW * gridH);
  let total = 0;
  for (let gy = 0; gy < gridH; gy++) {
    const iy = Math.min(h - 1, Math.floor(((gy + .5) / gridH) * h));
    for (let gx = 0; gx < gridW; gx++) {
      const ix = Math.min(w - 1, Math.floor(((gx + .5) / gridW) * w));
      const q = (iy * w + ix) * 4;
      const r = px[q] / 255, g = px[q + 1] / 255, b = px[q + 2] / 255;
      const lum = r * .2126 + g * .7152 + b * .0722;
      const hi = Math.max(r, g, b), lo = Math.min(r, g, b);
      const chroma = hi - lo;
      const weight = .010 + Math.pow(lum, 1.65) * .96 + Math.pow(chroma, 1.18) * .22;
      total += weight;
      cumulative[gy * gridW + gx] = total;
    }
  }
  const pick = (seed: number) => {
    const needle = hash01(seed) * total;
    let lo = 0, hi = cumulative.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cumulative[mid] < needle) lo = mid + 1; else hi = mid;
    }
    const idx = lo, gx = idx % gridW, gy = Math.floor(idx / gridW);
    const ju = hash01(seed * 3.13 + 21.4), jv = hash01(seed * 7.37 + 57.1);
    return {
      x: Math.min(w - 1, Math.floor(((gx + ju) / gridW) * w)),
      y: Math.min(h - 1, Math.floor(((gy + jv) / gridH) * h)),
    };
  };

  const cx = w * .5, cy = h * .5, scale = displayHeight / Math.max(1, h);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const important = hash01(i * 2.93 + 13.1) > .08;
    const picked = important
      ? pick(i * 11.83 + 7.2)
      : { x: Math.floor(hash01(i * 4.13 + 83.7) * w), y: Math.floor(hash01(i * 8.71 + 31.9) * h) };
    const q = (picked.y * w + picked.x) * 4, p = i * 3;
    target[p] = (picked.x - cx) * scale + xShift;
    target[p + 1] = -(picked.y - cy) * scale + yShift;
    target[p + 2] = hashSigned(i * 1.91 + 7.3) * .022;
    colors[p] = Math.min(1, px[q] / 255 * 1.045);
    colors[p + 1] = Math.min(1, px[q + 1] / 255 * 1.045);
    colors[p + 2] = Math.min(1, px[q + 2] / 255 * 1.045);
  }
  return true;
}

function buildEarth(image: HTMLImageElement, target: Float32Array, colors: Float32Array) {
  const canvas = document.createElement("canvas"), w = image.naturalWidth || image.width, h = image.naturalHeight || image.height; canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true }); if (!ctx) return;
  ctx.drawImage(image, 0, 0, w, h); const px = ctx.getImageData(0, 0, w, h).data, cx = w * .5, cy = h * .5;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const a = hash01(i * 2.4) * Math.PI * 2, r = Math.sqrt(hash01(i * 7.2)) * .78, x = Math.cos(a) * r, y = Math.sin(a) * r * .82, z = -Math.sqrt(Math.max(0, .64 - r * r));
    const ix = Math.max(0, Math.min(w - 1, Math.floor(cx + (x / .78) * w * .48))), iy = Math.max(0, Math.min(h - 1, Math.floor(cy - (y / .64) * h * .48))), q = (iy * w + ix) * 4, p = i * 3;
    target[p] = x + .88; target[p + 1] = y; target[p + 2] = z * .52;
    colors[p] = px[q] / 255; colors[p + 1] = px[q + 1] / 255; colors[p + 2] = px[q + 2] / 255;
  }
}

function sampleCoverImage(image: HTMLImageElement, target: Float32Array, colors: Float32Array, viewportAspect = 16 / 9) {
  const canvas = document.createElement("canvas");
  const w = image.naturalWidth || image.width, h = image.naturalHeight || image.height;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  ctx.drawImage(image, 0, 0, w, h);
  const px = ctx.getImageData(0, 0, w, h).data;

  // Match the CSS `object-fit: cover` composition EXACTLY. The previous version
  // sampled the right artwork but mapped it into a narrower coordinate system,
  // so the particle universe and the sharp universe could never truly overlap.
  const imageAspect = w / Math.max(h, 1);
  const visibleW = Math.min(1, viewportAspect / imageAspect);
  const visibleH = Math.min(1, imageAspect / viewportAspect);
  const cropX = (1 - visibleW) * 0.5;
  const cropY = (1 - visibleH) * 0.5;

  // Build a compact weighted distribution from the actual artwork. Bright
  // galaxies, stars, colorful nebulae and Earth's illuminated edge receive more
  // particles, while a controlled minority remains in dark space. This gives
  // the particle image recognizable structure instead of a uniform fog.
  const gridW = 320, gridH = Math.max(1, Math.round(gridW / imageAspect));
  const weights = new Float32Array(gridW * gridH);
  const cumulative = new Float64Array(weights.length);
  let total = 0;
  for (let gy = 0; gy < gridH; gy++) {
    const v = cropY + ((gy + .5) / gridH) * visibleH;
    const iy = Math.min(h - 1, Math.max(0, Math.floor(v * h)));
    for (let gx = 0; gx < gridW; gx++) {
      const u = cropX + ((gx + .5) / gridW) * visibleW;
      const ix = Math.min(w - 1, Math.max(0, Math.floor(u * w)));
      const q = (iy * w + ix) * 4;
      const r = px[q] / 255, g = px[q + 1] / 255, b = px[q + 2] / 255;
      const lum = r * .2126 + g * .7152 + b * .0722;
      const hi = Math.max(r, g, b), lo = Math.min(r, g, b);
      const chroma = hi - lo;
      // Keep a small baseline for dark starfield dust, but strongly favor real
      // luminous structures. The square-root term keeps medium-bright details.
      const weight = .018 + Math.pow(lum, 1.55) * .82 + Math.pow(chroma, 1.15) * .18;
      const idx = gy * gridW + gx;
      weights[idx] = weight;
      total += weight;
      cumulative[idx] = total;
    }
  }

  const pick = (seed: number) => {
    const needle = hash01(seed) * total;
    let lo = 0, hi = cumulative.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cumulative[mid] < needle) lo = mid + 1; else hi = mid;
    }
    const idx = lo;
    const gx = idx % gridW, gy = Math.floor(idx / gridW);
    // Jitter within the selected cell prevents visible grid patterns.
    const ju = hash01(seed * 3.17 + 41.7), jv = hash01(seed * 7.91 + 19.4);
    return {
      u: cropX + ((gx + ju) / gridW) * visibleW,
      v: cropY + ((gy + jv) / gridH) * visibleH,
    };
  };

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // 12% uniform samples preserve the deep-space field; 88% importance samples
    // reconstruct the galaxies/nebulae/planet instead of wasting particles in black.
    const important = hash01(i * 2.71 + 8.4) > .12;
    let u: number, v: number;
    if (important) {
      const picked = pick(i * 11.37 + 5.1);
      u = picked.u; v = picked.v;
    } else {
      u = cropX + hash01(i * 4.17 + 91.3) * visibleW;
      v = cropY + hash01(i * 8.31 + 17.7) * visibleH;
    }

    const ix = Math.min(w - 1, Math.max(0, Math.floor(u * w)));
    const iy = Math.min(h - 1, Math.max(0, Math.floor(v * h)));
    const q = (iy * w + ix) * 4;
    const p = i * 3;

    // Exact screen-space mapping for the orthographic camera used by ParticleScene:
    // x ∈ [-aspect,+aspect], y ∈ [-1,+1]. This makes the particle artwork occupy
    // the exact same rectangle as the full-screen CSS cover image.
    const screenX = (u - cropX) / visibleW;
    const screenY = (v - cropY) / visibleH;
    target[p] = (screenX * 2 - 1) * viewportAspect;
    target[p + 1] = 1 - screenY * 2;
    target[p + 2] = hashSigned(i * 12.17) * .018;

    colors[p] = Math.min(1, (px[q] / 255) * 1.04);
    colors[p + 1] = Math.min(1, (px[q + 1] / 255) * 1.04);
    colors[p + 2] = Math.min(1, (px[q + 2] / 255) * 1.04);
  }
  return true;
}

function sampleCoverImageToRect(image: HTMLImageElement, target: Float32Array, colors: Float32Array, rectWidth: number, rectHeight: number, rectLeft: number, rectTop: number) {
  const canvas=document.createElement("canvas");
  const w=image.naturalWidth||image.width,h=image.naturalHeight||image.height; canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext("2d",{willReadFrequently:true}); if(!ctx)return false;
  ctx.drawImage(image,0,0,w,h); const px=ctx.getImageData(0,0,w,h).data;
  const imageAspect=w/Math.max(h,1), rectAspect=rectWidth/Math.max(rectHeight,1);
  const visibleW=Math.min(1,rectAspect/imageAspect), visibleH=Math.min(1,imageAspect/rectAspect);
  const cropX=(1-visibleW)*.5,cropY=(1-visibleH)*.5;
  const gridW=320,gridH=Math.max(1,Math.round(gridW*visibleH/visibleW));
  const cumulative=new Float64Array(gridW*gridH);let total=0;
  for(let gy=0;gy<gridH;gy++)for(let gx=0;gx<gridW;gx++){
    const u=cropX+((gx+.5)/gridW)*visibleW,v=cropY+((gy+.5)/gridH)*visibleH;
    const ix=Math.min(w-1,Math.floor(u*w)),iy=Math.min(h-1,Math.floor(v*h)),q=(iy*w+ix)*4;
    const r=px[q]/255,g=px[q+1]/255,b=px[q+2]/255,lum=r*.2126+g*.7152+b*.0722,chroma=Math.max(r,g,b)-Math.min(r,g,b);
    total+=.012+Math.pow(lum,1.55)*.84+Math.pow(chroma,1.15)*.20;cumulative[gy*gridW+gx]=total;
  }
  const pick=(seed:number)=>{const needle=hash01(seed)*total;let lo=0,hi=cumulative.length-1;while(lo<hi){const mid=(lo+hi)>>1;if(cumulative[mid]<needle)lo=mid+1;else hi=mid}const idx=lo,gx=idx%gridW,gy=Math.floor(idx/gridW),ju=hash01(seed*3.17+41.7),jv=hash01(seed*7.91+19.4);return{u:cropX+((gx+ju)/gridW)*visibleW,v:cropY+((gy+jv)/gridH)*visibleH}};
  const left=rectLeft, top=rectTop;
  for(let i=0;i<PARTICLE_COUNT;i++){
    const important=hash01(i*2.71+8.4)>.10; let u:number,v:number;
    if(important){const z=pick(i*11.37+5.1);u=z.u;v=z.v}else{u=cropX+hash01(i*4.17+91.3)*visibleW;v=cropY+hash01(i*8.31+17.7)*visibleH}
    const ix=Math.min(w-1,Math.max(0,Math.floor(u*w))),iy=Math.min(h-1,Math.max(0,Math.floor(v*h))),q=(iy*w+ix)*4,p=i*3;
    // Map the cropped image rectangle directly into the orthographic camera.
    const sx=(u-cropX)/visibleW, sy=(v-cropY)/visibleH;
    target[p]=left+sx*rectWidth; target[p+1]=top-sy*rectHeight; target[p+2]=hashSigned(i*12.17)*.018;
    colors[p]=Math.min(1,px[q]/255*1.04);colors[p+1]=Math.min(1,px[q+1]/255*1.04);colors[p+2]=Math.min(1,px[q+2]/255*1.04);
  }
  return true;
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim().toUpperCase();
}

const NARRATIVE_LABELS = [
  "FIRST, QUESTION YOURSELF",
  "WHO IS THE I?",
  "ONE PLANET. BILLIONS OF DESIRES",
  "WHAT DO WE CALL PROGRESS?",
  "FROM LIFE TO THE UNIVERSE",
  "FIRST, QUESTION. THEN, SEE",
];

function findNarrativeCenter(label: string) {
  const wanted = normalizeText(label);
  const candidates = Array.from(document.querySelectorAll("h1,h2,h3,[data-section-title]")) as HTMLElement[];
  let best: HTMLElement | null = null;
  let bestLength = Infinity;
  for (const el of candidates) {
    const text = normalizeText(el.textContent || "");
    if (text.includes(wanted) && text.length < bestLength) {
      best = el;
      bestLength = text.length;
    }
  }
  if (!best) return null;
  const rect = best.getBoundingClientRect();
  return rect.top + window.scrollY + rect.height * .5;
}

function getNarrativeSections(): (HTMLElement | null)[] {
  const ids = ["self", "acharya", "earth", "nature", "universe"];
  const sections = ids.map((id) => document.getElementById(id));
  const finale = document.querySelector("section.finale") as HTMLElement | null;
  return [...sections, finale];
}

function getTransitionState(scrollY: number, sections: (HTMLElement | null)[]) {
  const vh = Math.max(window.innerHeight, 1);
  const first = sections[0];

  // TRANSITION 0 IS INTENTIONALLY INSIDE #self.
  // It starts after the user has moved into FIRST, QUESTION YOURSELF and
  // finishes before leaving that section. It is NOT tied to the heading.
  const firstTop = first ? first.getBoundingClientRect().top + scrollY : 0;
  const firstHeight = first ? first.getBoundingClientRect().height : vh;
  const firstStart = firstTop + firstHeight * .18;
  const firstEnd = firstTop + firstHeight * .82;

  const states = [smoother((scrollY - firstStart) / Math.max(firstEnd - firstStart, vh * .35))];

  // Every later transition is anchored to the ACTUAL bottom edge of its
  // preceding chapter. A short window begins just below that edge, so the
  // transitions occur one-by-one at the chapter boundaries.
  for (let i = 0; i < 5; i++) {
    const section = sections[i];
    if (!section) { states.push(0); continue; }
    const rect = section.getBoundingClientRect();
    const boundary = rect.top + scrollY + rect.height;
    const start = boundary + vh * .015;
    const span = vh * .30;
    states.push(smoother((scrollY - start) / span));
  }
  return states;
}



function ParticleScene() {
  const apTexture = useLoader(THREE.TextureLoader, SOURCE);
  const pointsRef = useRef<THREE.Points>(null), materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, size } = useThree();
  const [ready, setReady] = useState(false);
  const targetReady = useRef({ krishna:false, brain:false, earth:false, nature:false, universe:false, eye:false });
  const centersRef = useRef<(HTMLElement | null)[]>([]);
  const lastStageRef = useRef(0);
  const lastReadyMaskRef = useRef(-1);
  const lastPointSizeRef = useRef(-1);
  const activeTransitionRef = useRef(0);
  const smoothProgressRef = useRef([0,0,0,0,0,0]);
  const data = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const apTarget = new Float32Array(PARTICLE_COUNT * 3), krishnaTarget = new Float32Array(PARTICLE_COUNT * 3), brainTarget = new Float32Array(PARTICLE_COUNT * 3), earthTarget = new Float32Array(PARTICLE_COUNT * 3), natureTarget = new Float32Array(PARTICLE_COUNT * 3), universeTarget = new Float32Array(PARTICLE_COUNT * 3), eyeTarget = new Float32Array(PARTICLE_COUNT * 3);
    const apColors = new Float32Array(PARTICLE_COUNT * 3), krishnaColors = new Float32Array(PARTICLE_COUNT * 3), brainColors = new Float32Array(PARTICLE_COUNT * 3), earthColors = new Float32Array(PARTICLE_COUNT * 3), natureColors = new Float32Array(PARTICLE_COUNT * 3), universeColors = new Float32Array(PARTICLE_COUNT * 3), eyeColors = new Float32Array(PARTICLE_COUNT * 3);
    const currentColors = new Float32Array(PARTICLE_COUNT * 3), nextColors = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT * 4);
    const flow = new Float32Array(PARTICLE_COUNT * 3);
    for (let i=0;i<PARTICLE_COUNT;i++) {
      const r1=hash01(i+11), r2=hash01(i+100011), r3=hash01(i+200011), th=r1*Math.PI*2, ph=Math.acos(2*r2-1), rad=2.2+Math.pow(r3,.42)*4.6, p=i*3, q=i*4;
      positions[p]=Math.sin(ph)*Math.cos(th)*rad; positions[p+1]=Math.cos(ph)*rad*.74; positions[p+2]=Math.sin(ph)*Math.sin(th)*rad;
      seeds[q]=r1; seeds[q+1]=r2; seeds[q+2]=r3; seeds[q+3]=.34+Math.pow(hash01(i*17.3),2.35)*1.48;
      const fq=i*3, a=th+hash01(i*31.7)*6.28318, fy=(r2-.5)*1.35, fz=(r3-.5)*1.15;
      flow[fq]=Math.cos(a)*.92; flow[fq+1]=fy; flow[fq+2]=Math.sin(a)*.92+fz*.22;
    }
    return {positions,flow,apTarget,krishnaTarget,brainTarget,earthTarget,natureTarget,universeTarget,eyeTarget,apColors,krishnaColors,brainColors,earthColors,natureColors,universeColors,eyeColors,currentColors,nextColors,seeds};
  }, []);
  const colorTargets = useMemo(() => [data.apColors, data.krishnaColors, data.brainColors, data.earthColors, data.natureColors, data.universeColors, data.eyeColors], [data]);
  const geometry = useMemo(() => {
    const g=new THREE.BufferGeometry();
    g.setAttribute("position",new THREE.BufferAttribute(data.positions,3));
    g.setAttribute("aAP",new THREE.BufferAttribute(data.apTarget,3));
    g.setAttribute("aKrishna",new THREE.BufferAttribute(data.krishnaTarget,3));
    g.setAttribute("aBrain",new THREE.BufferAttribute(data.brainTarget,3));
    g.setAttribute("aEarth",new THREE.BufferAttribute(data.earthTarget,3));
    g.setAttribute("aNature",new THREE.BufferAttribute(data.natureTarget,3));
    g.setAttribute("aUniverse",new THREE.BufferAttribute(data.universeTarget,3));
    g.setAttribute("aEye",new THREE.BufferAttribute(data.eyeTarget,3));
    g.setAttribute("aColor",new THREE.BufferAttribute(data.currentColors,3));
    g.setAttribute("aNextColor",new THREE.BufferAttribute(data.nextColors,3));
    g.setAttribute("aSeed",new THREE.BufferAttribute(data.seeds,4));
    g.setAttribute("aFlow",new THREE.BufferAttribute(data.flow,3));
    return g;
  }, [data]);

  useEffect(() => {
    const ok=sampleWeightedImage(apTexture.image as HTMLImageElement,data.apTarget,data.apColors,1.91,1.217,-.14);
    if(ok){geometry.attributes.aAP.needsUpdate=true; data.currentColors.set(data.apColors); data.nextColors.set(data.krishnaColors); geometry.attributes.aColor.needsUpdate=true; geometry.attributes.aNextColor.needsUpdate=true; setReady(true);}
  }, [apTexture,data,geometry]);

  useEffect(() => {
    if(!ready) return;
    let cancelled=false;
    const load=(src:string)=>new Promise<HTMLImageElement>((resolve,reject)=>{const img=new Image();img.decoding="async";img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});
    const idle=(fn:()=>void)=>{const ric=(window as Window & {requestIdleCallback?: (cb:()=>void,opts?:{timeout:number})=>number}).requestIdleCallback;if(ric) ric(fn,{timeout:900}); else window.setTimeout(fn,40);};
    const mark=(name:string)=>{const a=geometry.attributes;if(name==="krishna")a.aKrishna.needsUpdate=true;if(name==="brain")a.aBrain.needsUpdate=true;if(name==="earth")a.aEarth.needsUpdate=true;if(name==="nature")a.aNature.needsUpdate=true;if(name==="universe")a.aUniverse.needsUpdate=true;if(name==="eye")a.aEye.needsUpdate=true;};
    let removeResize=()=>{};
    (async()=>{try{
      const k=await load(KRISHNA_SOURCE);if(cancelled)return;sampleImage(k,data.krishnaTarget,data.krishnaColors,1.76,1.197,0,{alphaOnly:true});mark("krishna");targetReady.current.krishna=true;
      const brain=await load(BRAIN_SOURCE);if(cancelled)return;sampleWeightedImage(brain,data.brainTarget,data.brainColors,1.72,.96,-.02);mark("brain");targetReady.current.brain=true;
      const e=await load(EARTH_SOURCE);if(cancelled)return;sampleImage(e,data.earthTarget,data.earthColors,.748,.693,-.02,{alphaOnly:true});mark("earth");targetReady.current.earth=true;
      const n=await load(NATURE_SOURCE);if(cancelled)return;sampleAlphaWeightedImage(n,data.natureTarget,data.natureColors,1.76,.939,-.02);mark("nature");targetReady.current.nature=true;
      const u=await load(UNIVERSE_SOURCE);if(cancelled)return;
      const rebuild=()=>{if(cancelled)return;sampleCoverImage(u,data.universeTarget,data.universeColors,Math.max(1,window.innerWidth/Math.max(window.innerHeight,1)));mark("universe");targetReady.current.universe=true;};
      rebuild();let timer=0;const onResize=()=>{clearTimeout(timer);timer=window.setTimeout(rebuild,260);};window.addEventListener("resize",onResize,{passive:true});removeResize=()=>{window.removeEventListener("resize",onResize);clearTimeout(timer);};
      const eye=await load(EYE_SOURCE);if(cancelled)return;(() => { const aspect=window.innerWidth/Math.max(window.innerHeight,1); const frac=window.innerWidth<=600?.72:.58; sampleCoverImageToRect(eye,data.eyeTarget,data.eyeColors,2*aspect*frac,2,-aspect,1); })();mark("eye");targetReady.current.eye=true;
      journeyState.allTargetsReady = Object.values(targetReady.current).every(Boolean);
      idle(()=>{});
    }catch(err){console.error("Particle target loading failed",err);} })();
    const refresh=()=>{centersRef.current=getNarrativeSections();};
    refresh();
    window.addEventListener("resize",refresh,{passive:true});
    window.addEventListener("load",refresh);
    const fontReady = document.fonts?.ready.then(refresh).catch(()=>{});
    return()=>{cancelled=true;journeyState.allTargetsReady=false;removeResize();window.removeEventListener("resize",refresh);window.removeEventListener("load",refresh);void fontReady;};
  },[ready,data,geometry]);

  useEffect(()=>{const ortho=camera as THREE.OrthographicCamera,aspect=size.width/Math.max(size.height,1);ortho.left=-aspect;ortho.right=aspect;ortho.top=1;ortho.bottom=-1;ortho.near=-20;ortho.far=20;ortho.position.set(0,0,5);ortho.updateProjectionMatrix();},[camera,size]);

  useFrame((state)=>{
    if(!materialRef.current||!ready)return;
    const t=state.clock.elapsedTime, dt=state.clock.getDelta(), scrollY=typeof window!=="undefined"?window.scrollY:0, sections=centersRef.current.length===6?centersRef.current:getNarrativeSections(), rawProgresses=getTransitionState(scrollY,sections);
    const progresses=smoothProgressRef.current;
    const follow=1-Math.exp(-Math.max(dt,.001)*8.8);
    const intro=Math.min(1,t/4.8);
    const scrollUnlock=journeyState.allTargetsReady ? smoother((t-4.8)/.8) : 0;

    // HARD SEQUENTIAL CONTROLLER:
    // Only one morph is ever allowed to receive scroll progress. We never let
    // a fast wheel/trackpad jump over Brain/Earth/Nature/etc. The next morph
    // always starts at exactly 0 after the previous one reaches 1. This is the
    // same model as the AP -> Krishna transition, applied to every chapter.
    let active=activeTransitionRef.current;
    const raw=rawProgresses[active] ?? 0;
    if(raw >= .995 && progresses[active] >= .995 && active < rawProgresses.length-1){
      // Advance only after the CURRENT GPU morph has actually reached its target.
      // A large wheel jump must never skip Brain/Earth/Nature/etc. by advancing
      // through several raw scroll states in consecutive frames.
      progresses[active] = 1;
      active += 1;
      progresses[active] = 0;
      activeTransitionRef.current = active;
    } else if(raw <= .005 && progresses[active] <= .005 && active > 0){
      // Symmetric reverse-scroll handoff: finish the current reverse morph first.
      progresses[active] = 0;
      active -= 1;
      progresses[active] = 1;
      activeTransitionRef.current = active;
    }
    for(let i=0;i<progresses.length;i++){
      const target = i < active ? 1 : i > active ? 0 : rawProgresses[active]*scrollUnlock;
      progresses[i] += (target-progresses[i])*follow;
    }
    journeyState.intro=intro;
    for(let i=0;i<6;i++) journeyState.progresses[i]=progresses[i];
    // The active transition is the single source of truth for particle colors.
    // Do not infer a stage from lagging smoothed progress; that inference could
    // momentarily jump palettes at a handoff and create a flash.
    const safeStage=Math.max(0,Math.min(6,active));
    if(safeStage!==lastStageRef.current){
      const a=geometry.attributes.aColor.array as Float32Array, b=geometry.attributes.aNextColor.array as Float32Array;
      a.set(colorTargets[safeStage]); b.set(colorTargets[Math.min(safeStage+1,colorTargets.length-1)]);
      geometry.attributes.aColor.needsUpdate=true; geometry.attributes.aNextColor.needsUpdate=true;
      lastStageRef.current=safeStage;
    }
    const m=materialRef.current;
    const transitionProgress = progresses[active] ?? 0;
    const morph = smoothMorph(transitionProgress);
    m.uniforms.uTime.value=t;m.uniforms.uIntro.value=intro;m.uniforms.uActiveStage.value=active;m.uniforms.uTransition.value=transitionProgress;m.uniforms.uTransitionEnergy.value=Math.sin(Math.max(0,Math.min(1,transitionProgress))*Math.PI);m.uniforms.uMorph.value=morph;m.uniforms.uKrishna.value=progresses[0];m.uniforms.uBrain.value=progresses[1];m.uniforms.uEarth.value=progresses[2];m.uniforms.uNature.value=progresses[3];m.uniforms.uUniverse.value=progresses[4];m.uniforms.uEye.value=progresses[5];
    const readyMask = (targetReady.current.krishna?1:0) | (targetReady.current.brain?2:0) | (targetReady.current.earth?4:0) | (targetReady.current.nature?8:0) | (targetReady.current.universe?16:0) | (targetReady.current.eye?32:0);
    if (readyMask !== lastReadyMaskRef.current) {
      m.uniforms.uKrishnaReady.value=targetReady.current.krishna?1:0;m.uniforms.uBrainReady.value=targetReady.current.brain?1:0;m.uniforms.uEarthReady.value=targetReady.current.earth?1:0;m.uniforms.uNatureReady.value=targetReady.current.nature?1:0;m.uniforms.uUniverseReady.value=targetReady.current.universe?1:0;m.uniforms.uEyeReady.value=targetReady.current.eye?1:0;
      lastReadyMaskRef.current = readyMask;
    }
    const pointSize = size.width<800?1.22:1.52;
    if (pointSize !== lastPointSizeRef.current) { m.uniforms.uPointSize.value=pointSize; lastPointSizeRef.current=pointSize; }
    if(pointsRef.current){pointsRef.current.rotation.y=Math.sin(t*.12)*.008;pointsRef.current.rotation.x=Math.cos(t*.1)*.003;}
  });
  if(!ready)return null;
  return <points ref={pointsRef} frustumCulled={false}><primitive object={geometry} attach="geometry"/><shaderMaterial ref={materialRef} transparent depthWrite={false} depthTest={false} blending={THREE.NormalBlending} uniforms={{uTime:{value:0},uIntro:{value:0},uActiveStage:{value:0},uTransition:{value:0},uTransitionEnergy:{value:0},uMorph:{value:0},uKrishna:{value:0},uBrain:{value:0},uEarth:{value:0},uNature:{value:0},uUniverse:{value:0},uEye:{value:0},uKrishnaReady:{value:0},uBrainReady:{value:0},uEarthReady:{value:0},uNatureReady:{value:0},uUniverseReady:{value:0},uEyeReady:{value:0},uPointSize:{value:1.18}}} vertexShader={VERTEX_SHADER} fragmentShader={FRAGMENT_SHADER}/></points>;
}

const VERTEX_SHADER=/*glsl*/`
uniform float uTime,uIntro,uActiveStage,uTransition,uTransitionEnergy,uMorph,uKrishna,uBrain,uEarth,uNature,uUniverse,uEye,uKrishnaReady,uBrainReady,uEarthReady,uNatureReady,uUniverseReady,uEyeReady,uPointSize;
attribute vec3 aAP,aKrishna,aBrain,aEarth,aNature,aUniverse,aEye,aColor,aNextColor,aFlow;attribute vec4 aSeed;varying vec3 vColor;varying float vAlpha;
#define PI 3.14159265359
float S(float x){x=clamp(x,0.,1.);return x*x*x*(x*(x*6.-15.)+10.);}
vec3 path(vec3 flow,vec4 s,float energy,float phase){float arc=sin(s.x*PI*2.+phase+uTime*1.10)*.42;float sp=cos(s.y*PI*2.+phase+uTime*.32)*.18;return flow*arc*energy+vec3(sp,-sp*.35,0.)*energy;}
void main(){
 float intro=S(uIntro); vec3 p;
 // Hero: particles begin dispersed in a spherical field and converge into AP without scrolling.
 // Scroll morphing is locked until this intro is complete, so Krishna can never
 // overwrite the AP formation during the first seconds.
 float transition=0.;
 if(uIntro<.999){
   p=mix(position,aAP,intro);
   float introEnergy=sin((1.-intro)*PI*.5);
   p+=path(position,aSeed,introEnergy*.92,3.7);
 } else {
   float q=clamp(uTransition,0.,1.); transition=q;
   if(uActiveStage<.5){ p=mix(aAP,aKrishna,uMorph); float b=uTransitionEnergy; if(b>0.0005) p+=path(aAP,aSeed,b*.20,11.)+aFlow*b*.10; }
   else if(uActiveStage<1.5){ p=mix(aKrishna,aBrain,uMorph); float b=uTransitionEnergy; if(b>0.0005) p+=path(aKrishna,aSeed,b*.20,17.)+aFlow*b*.10; }
   else if(uActiveStage<2.5){ p=mix(aBrain,aEarth,uMorph); float b=uTransitionEnergy; if(b>0.0005) p+=path(aBrain,aSeed,b*.18,23.)+aFlow*b*.09; }
   else if(uActiveStage<3.5){ p=mix(aEarth,aNature,uMorph); float b=uTransitionEnergy; if(b>0.0005) p+=path(aEarth,aSeed,b*.20,29.)+aFlow*b*.10; }
   else if(uActiveStage<4.5){ p=mix(aNature,aUniverse,uMorph); float b=uTransitionEnergy; if(b>0.0005) p+=path(aNature,aSeed,b*.22,37.)+aFlow*b*.11; }
   else if(uActiveStage<5.5){ p=mix(aUniverse,aEye,uMorph); float b=uTransitionEnergy; if(b>0.0005) p+=path(aUniverse,aSeed,b*.20,43.)+aFlow*b*.10; }
   else { p=aEye; transition=1.; }
 }

 // Particles NEVER become static when the target image is formed. Keep a
 // restrained living motion above every sharp image, including q=1/final.
 // This is intentionally independent of the image opacity.
 float swirl=4.0*transition*(1.0-transition);
 float ambientA=sin(uTime*.72+aSeed.x*12.0+aSeed.y*4.0)*.009;
 float ambientB=cos(uTime*.48+aSeed.z*10.0)*.006;
 vec3 living=vec3(ambientA,ambientB,ambientA*.55);
 p+=aFlow*(.006+.005*swirl)*sin(uTime*.62+aSeed.w*9.0)+living;
 float particleSize=aSeed.w;
 // Color follows the active morph continuously; never jump to the next palette.
 float colorT=transition;
 vColor=mix(aColor,aNextColor,colorT);
 float lum=dot(vColor,vec3(.2126,.7152,.0722));vColor=mix(vec3(lum),vColor,1.22);vColor=min(vColor*1.12,vec3(1.0));
 float visibility=1.; if(uActiveStage<.5 && uIntro>=.999){ visibility=S(clamp(uTransition/.10,0.,1.)); } vAlpha=visibility;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(uPointSize*particleSize,.95,4.2);
}`;
const FRAGMENT_SHADER=/*glsl*/`varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d2=dot(p,p);float a=1.-smoothstep(.1156,.25,d2);if(a<.01)discard;gl_FragColor=vec4(vColor,a*vAlpha);}`;

function VisualLayer({src,className,stageIndex,final=false,register}:{src:string;className:string;stageIndex:number;final?:boolean;register:(el:HTMLImageElement|null,index:number)=>void}){
  return <img ref={(el)=>register(el,stageIndex)} className={`visual-layer ${className}`} src={src} alt="" draggable="false" loading="eager" />;
}

function VisualLayers(){
  const refs=useRef<(HTMLImageElement|null)[]>([]);
  useEffect(()=>{
    let raf=0;
    const REVEAL_START=0.78;
    const REVEAL_END=0.995;
    const FADE_OUT_START=0.08;
    const FADE_OUT_END=0.92;
    const revealStarted=Array<number>(7).fill(-1);
    const revealWasStarted=Array<boolean>(7).fill(false);

    const smooth01=(x:number)=>{
      x=Math.max(0,Math.min(1,x));
      return x*x*x*(x*(x*6-15)+10);
    };
    const clamp=(v:number)=>Math.max(0,Math.min(1,v));

    const update=()=>{
      const now=performance.now();
      const p=journeyState.progresses;

      for(let stageIndex=0;stageIndex<7;stageIndex++){
        const el=refs.current[stageIndex];
        if(!el) continue;
        if(!(el.complete && el.naturalWidth>0)){
          el.style.opacity="0";
          continue;
        }

        // Incoming progress is exactly the particle morph that creates this
        // image. Outgoing progress is exactly the morph that destroys it.
        const incoming=stageIndex===0 ? clamp(journeyState.intro) : clamp(p[stageIndex-1]||0);
        const outgoing=stageIndex===6 ? 0 : clamp(p[stageIndex]||0);

        // Arm the reveal only once particles are in their final convergence
        // zone. The reveal then has a real 1.2s minimum cinematic ramp, rather
        // than being allowed to jump to opacity 1 when scroll reaches 100%.
        if(!revealWasStarted[stageIndex] && incoming>=REVEAL_START){
          revealWasStarted[stageIndex]=true;
          revealStarted[stageIndex]=now;
        }

        let reveal=0;
        if(revealWasStarted[stageIndex] && revealStarted[stageIndex]>=0){
          // The time ramp is capped by the actual convergence endpoint. If the
          // particle morph has not completed yet, the image can never become
          // fully opaque. This keeps the image visually attached to the particles.
          const timeReveal=smooth01((now-revealStarted[stageIndex])/1200);
          const convergenceReveal=smooth01((incoming-REVEAL_START)/(REVEAL_END-REVEAL_START));
          reveal=Math.min(timeReveal,convergenceReveal);
        }

        // Once the next particle morph actually begins, the current image fades
        // out slowly. Because this is driven by the same p[] state as the shader,
        // the image cannot disappear early or remain stuck after disintegration.
        const fadeOut=stageIndex===6
          ? 1
          : 1-smooth01((outgoing-FADE_OUT_START)/(FADE_OUT_END-FADE_OUT_START));

        // A tiny floor avoids an apparent hard cut while preserving a genuinely
        // invisible state before the reveal starts.
        const opacity=clamp(reveal*fadeOut);
        el.style.opacity=String(opacity);
      }
      raf=requestAnimationFrame(update);
    };
    raf=requestAnimationFrame(update);
    return()=>cancelAnimationFrame(raf);
  },[]);

  const register=(el:HTMLImageElement|null,index:number)=>{refs.current[index]=el;};
  return <div className="visual-layers" aria-hidden="true">
    <VisualLayer src={SOURCE} className="visual-ap" stageIndex={0} register={register}/>
    <VisualLayer src={KRISHNA_SOURCE} className="visual-krishna" stageIndex={1} register={register}/>
    <VisualLayer src={BRAIN_SOURCE} className="visual-brain" stageIndex={2} register={register}/>
    <VisualLayer src={EARTH_SOURCE} className="visual-earth" stageIndex={3} register={register}/>
    <VisualLayer src={NATURE_SOURCE} className="visual-nature" stageIndex={4} register={register}/>
    <VisualLayer src={UNIVERSE_SOURCE} className="visual-universe" stageIndex={5} register={register}/>
    <VisualLayer src={EYE_SOURCE} className="visual-eye" stageIndex={6} register={register}/>
  </div>;
}

export default function ParticleJourney(){
  return <div className="particle-stage" aria-hidden="true">
    <Canvas orthographic camera={{position:[0,0,5],zoom:1}} dpr={[1,1.25]} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}} onCreated={({gl})=>gl.setClearColor(0x000000,0)}>
      <ParticleScene/><UniverseDecor/><CursorUniverse/>
    </Canvas>
    <VisualLayers/>
    <div className="stage-grain" />
  </div>;
}