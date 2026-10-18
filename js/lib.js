// ============================================================
//  lib.js — shared low-poly geometry helpers
// ============================================================
import * as THREE from 'three';

const _matCache = new Map();
export function mat(color, opts = {}) {
  const key = color + '|' + JSON.stringify(opts);
  if (_matCache.has(key)) return _matCache.get(key);
  const m = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    flatShading: true,
    roughness: opts.roughness ?? 0.92,
    metalness: opts.metalness ?? 0.04,
    ...(opts.emissive ? { emissive: new THREE.Color(opts.emissive), emissiveIntensity: opts.emissiveIntensity ?? 0.6 } : {}),
    ...(opts.transparent ? { transparent: true, opacity: opts.opacity ?? 1 } : {}),
    side: opts.side ?? THREE.FrontSide
  });
  _matCache.set(key, m);
  return m;
}

function finish(m) { m.castShadow = true; m.receiveShadow = true; return m; }

export function box(w, h, d, color, x = 0, y = 0, z = 0, opts) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, opts));
  m.position.set(x, y, z); return finish(m);
}
export function cyl(rt, rb, h, seg, color, x = 0, y = 0, z = 0, opts) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat(color, opts));
  m.position.set(x, y, z); return finish(m);
}
export function cone(r, h, seg, color, x = 0, y = 0, z = 0, opts) {
  const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), mat(color, opts));
  m.position.set(x, y, z); return finish(m);
}
export function sph(r, color, x = 0, y = 0, z = 0, opts = {}, seg = 10) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(6, seg - 2)), mat(color, opts));
  m.position.set(x, y, z); return finish(m);
}
export function dome(r, color, x = 0, y = 0, z = 0, opts = {}) {
  const g = new THREE.SphereGeometry(r, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
  const m = new THREE.Mesh(g, mat(color, opts)); m.position.set(x, y, z); return finish(m);
}
// a tapered 4-sided frustum (good for trapezoid rock platforms / gateways)
export function frustum(rTop, rBot, h, color, x = 0, y = 0, z = 0, rotY = Math.PI / 4, opts) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, 4), mat(color, opts));
  m.position.set(x, y, z); m.rotation.y = rotY; return finish(m);
}
// star-shaped extruded platform (Hoysala jagati)
export function starBase(outer, inner, points, h, color, x = 0, y = 0, z = 0) {
  const shape = new THREE.Shape();
  for (let i = 0; i < points * 2; i++) {
    const a = (i / (points * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? outer : inner;
    const px = Math.cos(a) * r, py = Math.sin(a) * r;
    i === 0 ? shape.moveTo(px, py) : shape.lineTo(px, py);
  }
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false });
  g.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(g, mat(color)); m.position.set(x, y, z); return finish(m);
}
// Hoysala-style lathe-turned tower
export function latheTower(h, color, x = 0, y = 0, z = 0) {
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const r = (1 - t) * 1.9 + 0.15 + Math.sin(t * Math.PI * 3) * 0.16;
    pts.push(new THREE.Vector2(Math.max(0.08, r), t * h));
  }
  const g = new THREE.LatheGeometry(pts, 12);
  const m = new THREE.Mesh(g, mat(color)); m.position.set(x, y, z); return finish(m);
}
export function group(x = 0, y = 0, z = 0) {
  const g = new THREE.Group(); g.position.set(x, y, z); return g;
}
export function addTo(parent, ...kids) { kids.forEach(k => parent.add(k)); return parent; }
