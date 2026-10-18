// ============================================================
//  emblems.js — stylised low-poly 3D royal emblems (animals)
//  Returns { g, legs[], wings[] } — main.js animates legs/wings.
// ============================================================
import * as THREE from 'three';
import { box, cyl, cone, sph, mat } from './lib.js';

function shade(hex, l) { const c = new THREE.Color(hex); c.offsetHSL(0, 0, l); return '#' + c.getHexString(); }

// a leg whose pivot is at the top so it can swing
function leg(color, len, r = 0.26) {
  const p = new THREE.Group();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.85, len, 6), mat(color));
  m.position.y = -len / 2; m.castShadow = true; p.add(m);
  const hoof = new THREE.Mesh(new THREE.BoxGeometry(r * 2.4, r, r * 2.4), mat(shade(color, -0.12)));
  hoof.position.y = -len; hoof.castShadow = true; p.add(hoof);
  return p;
}
function wing(color, len) {
  const p = new THREE.Group();
  const m = new THREE.Mesh(new THREE.BoxGeometry(len, 0.16, 0.7), mat(color));
  m.position.x = len / 2; m.castShadow = true; p.add(m);
  return p;
}
function part(geo, color, x, y, z) {
  const m = new THREE.Mesh(geo, mat(color)); m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true; return m;
}

function quadruped(c, o) {
  const g = new THREE.Group(), d = shade(c, -0.14);
  const body = part(new THREE.BoxGeometry(o.bl, o.bh, o.bw), c, 0, o.by, 0); g.add(body);
  if (o.hump) g.add(part(new THREE.BoxGeometry(o.bl * 0.4, o.bh * 0.5, o.bw), d, o.bl * 0.12, o.by + o.bh * 0.55, 0));
  const head = part(new THREE.BoxGeometry(o.hl, o.hh, o.hw), c, o.hx, o.hy, 0); g.add(head);
  if (o.mane) g.add(part(new THREE.SphereGeometry(o.mane, 8, 6), d, o.hx - 0.35, o.hy, 0));
  if (o.snout) g.add(part(new THREE.BoxGeometry(o.snout, o.hh * 0.45, o.hw * 0.55), d, o.hx + o.hl * 0.6, o.hy - o.hh * 0.2, 0));
  if (o.ears) { g.add(part(new THREE.BoxGeometry(0.2, o.hh * 0.7, 0.14), d, o.hx - 0.2, o.hy + o.hh * 0.5, o.hw * 0.4));
                g.add(part(new THREE.BoxGeometry(0.2, o.hh * 0.7, 0.14), d, o.hx - 0.2, o.hy + o.hh * 0.5, -o.hw * 0.4)); }
  if (o.horns) for (const s of [1, -1]) { const h = cone(0.1, 0.7, 6, d, o.hx + 0.1, o.hy + o.hh * 0.7, s * o.hw * 0.35); h.rotation.x = s * 0.5; g.add(h); }
  if (o.tusks) for (const s of [1, -1]) { const t = cone(0.09, 0.6, 6, '#f4ecd8', o.hx + o.hl * 0.7, o.hy - o.hh * 0.1, s * o.hw * 0.3); t.rotation.x = s * 0.7; g.add(t); }
  const legs = [];
  for (const lx of [o.bl * 0.34, -o.bl * 0.34]) for (const lz of [o.bw * 0.42, -o.bw * 0.42]) {
    const l = leg(c, o.legLen, o.legR); l.position.set(lx, o.by - o.bh / 2, lz); g.add(l); legs.push(l);
  }
  if (o.tail) { const t = new THREE.Group(); const tm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, o.tail, 6), mat(d)); tm.position.y = -o.tail / 2; t.add(tm); t.position.set(-o.bl * 0.55, o.by + o.bh * 0.3, 0); g.add(t); }
  return { g, legs, wings: [] };
}

// ---------------- species ----------------
function elephant(c) {
  const o = quadruped(c, { bl: 3.2, bh: 2.0, bw: 2.0, by: 2.0, hl: 1.6, hh: 1.6, hw: 1.6, hx: 2.0, hy: 2.1, ears: true, legLen: 1.9, legR: 0.34, tail: 1.0 });
  const d = shade(c, -0.14);
  o.g.add(part(new THREE.BoxGeometry(0.5, 1.5, 1.6), d, 2.1, 2.2, 1.0));
  o.g.add(part(new THREE.BoxGeometry(0.5, 1.5, 1.6), d, 2.1, 2.2, -1.0));
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.28, 2.0, 8), mat(c));
  trunk.position.set(2.75, 1.5, 0); trunk.rotation.z = 0.35; trunk.castShadow = true; o.g.add(trunk);
  for (const s of [1, -1]) o.g.add(cone(0.1, 0.7, 6, '#f4ecd8', 2.6, 1.5, s * 0.5));
  return o;
}
function lion(c) {
  const o = quadruped(c, { bl: 2.7, bh: 1.5, bw: 1.4, by: 1.8, hl: 1.2, hh: 1.2, hw: 1.2, hx: 1.7, hy: 2.1, mane: 1.15, ears: true, legLen: 1.6, legR: 0.24, tail: 1.1 });
  return o;
}
function tiger(c) {
  const o = quadruped(c, { bl: 3.1, bh: 1.4, bw: 1.3, by: 1.7, hl: 1.1, hh: 1.05, hw: 1.1, hx: 1.95, hy: 1.95, ears: true, legLen: 1.5, legR: 0.22, tail: 1.3 });
  const d = shade(c, -0.42);
  for (let i = 0; i < 5; i++) o.g.add(part(new THREE.BoxGeometry(0.12, 1.42, 1.32), d, -1.0 + i * 0.55, 1.7, 0));
  return o;
}
function boar(c) {
  const o = quadruped(c, { bl: 2.6, bh: 1.5, bw: 1.5, by: 1.5, hl: 1.2, hh: 1.1, hw: 1.1, hx: 1.6, hy: 1.6, snout: 0.7, tusks: true, legLen: 1.2, legR: 0.24, tail: 0.5 });
  const d = shade(c, -0.3);
  for (let i = 0; i < 4; i++) o.g.add(part(new THREE.ConeGeometry(0.16, 0.5, 5), d, -0.9 + i * 0.55, 2.35, 0));
  return o;
}
function bull(c) {
  const o = quadruped(c, { bl: 2.9, bh: 1.6, bw: 1.5, by: 1.9, hl: 1.3, hh: 1.2, hw: 1.1, hx: 1.75, hy: 2.1, hump: true, horns: true, legLen: 1.7, legR: 0.24, tail: 1.1 });
  return o;
}
function horse(c) {
  const o = quadruped(c, { bl: 2.9, bh: 1.3, bw: 1.2, by: 1.9, hl: 1.2, hh: 1.1, hw: 0.95, hx: 1.9, hy: 2.35, ears: true, legLen: 2.0, legR: 0.2, tail: 1.3 });
  const d = shade(c, -0.16);
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.9), mat(c));
  neck.position.set(1.45, 2.35, 0); neck.rotation.z = -0.5; neck.castShadow = true; o.g.add(neck);
  return o;
}
function fish(c) {
  const g = new THREE.Group(), d = shade(c, -0.16);
  const b = part(new THREE.SphereGeometry(1.2, 10, 8), c, 0, 1.2, 0); b.scale.set(1.5, 0.75, 0.5); g.add(b);
  g.add(part(new THREE.ConeGeometry(0.7, 1.0, 4), d, -1.7, 1.2, 0)).rotation.z = Math.PI / 2;
  g.add(part(new THREE.BoxGeometry(0.6, 0.5, 0.06), d, 0.2, 2.0, 0));
  const eye = part(new THREE.SphereGeometry(0.12, 6, 6), '#1a1a1a', 1.3, 1.35, 0.42); g.add(eye);
  return { g, legs: [], wings: [] };
}
function eagle(c) {
  const g = new THREE.Group(), d = shade(c, -0.18);
  const b = part(new THREE.SphereGeometry(0.9, 8, 6), c, 0, 2.2, 0); b.scale.set(1.0, 1.3, 0.8); g.add(b);
  g.add(part(new THREE.SphereGeometry(0.5, 8, 6), c, 0.1, 3.2, 0));
  g.add(part(new THREE.ConeGeometry(0.16, 0.5, 5), '#e8c060', 0.55, 3.15, 0)).rotation.z = -Math.PI / 2;
  const wings = [];
  for (const s of [1, -1]) { const w = wing(c, 2.2); w.position.set(0, 2.5, s * 0.5); if (s < 0) w.rotation.y = Math.PI; g.add(w); wings.push(w); }
  const tail = part(new THREE.ConeGeometry(0.6, 1.2, 4), d, -1.1, 2.0, 0); tail.rotation.z = Math.PI / 2; g.add(tail);
  return { g, legs: [], wings };
}
function bird2(c) {
  const g = new THREE.Group(), d = shade(c, -0.18);
  const b = part(new THREE.SphereGeometry(1.0, 8, 6), c, 0, 2.3, 0); b.scale.set(1.1, 1.3, 0.9); g.add(b);
  for (const s of [1, -1]) {
    g.add(part(new THREE.SphereGeometry(0.45, 8, 6), c, s * 0.55, 3.3, 0));
    g.add(part(new THREE.ConeGeometry(0.14, 0.45, 5), '#e8c060', s * 0.95, 3.25, 0)).rotation.z = -s * Math.PI / 2;
  }
  const wings = [];
  for (const s of [1, -1]) { const w = wing(c, 2.0); w.position.set(0, 2.6, s * 0.6); if (s < 0) w.rotation.y = Math.PI; g.add(w); wings.push(w); }
  const tail = part(new THREE.ConeGeometry(0.7, 1.4, 4), d, -1.3, 2.1, 0); tail.rotation.z = Math.PI / 2; g.add(tail);
  return { g, legs: [], wings };
}
function crescent(c) {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.5, 8, 16, Math.PI * 1.25), mat(c));
  m.rotation.z = -Math.PI * 0.62; m.position.set(0, 3.0, 0); m.castShadow = true; g.add(m);
  g.add(part(new THREE.SphereGeometry(0.2, 6, 6), c, 0.6, 3.6, 0));
  return { g, legs: [], wings: [] };
}

const BUILDERS = { elephant, lion, tiger, boar, bull, horse, fish, eagle, bird2, crescent, boarSun: boar };

export function buildEmblem(type, color) {
  const e = (BUILDERS[type] || boar)(color);
  if (type === 'boarSun') { // Vijayanagara: boar + sun disc
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 8), mat('#ffd25a', { emissive: '#ffb020', emissiveIntensity: 0.7 }));
    s.position.set(1.4, 3.6, 0); s.castShadow = true; e.g.add(s);
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2;
      e.g.add(part(new THREE.BoxGeometry(0.1, 0.36, 0.1), '#ffd25a', 1.4 + Math.cos(a) * 0.85, 3.6 + Math.sin(a) * 0.85, 0)); }
  }
  return e;
}
