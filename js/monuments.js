// ============================================================
//  monuments.js — low-poly 3D monuments built from primitives
//  Every builder returns a THREE.Group whose base sits at y = 0.
// ============================================================
import * as THREE from 'three';
import { box, cyl, cone, sph, dome, frustum, starBase, latheTower, group, mat } from './lib.js';

function shade(hex, l) { const c = new THREE.Color(hex); c.offsetHSL(0, 0, l); return '#' + c.getHexString(); }
function rock(rTop, rBot, h, seg, color, x, y, z) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), mat(color));
  m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; return m;
}

// ---------- builders ----------
function stupa(mc) {
  const g = group(), d = shade(mc, -0.14), hi = shade(mc, 0.12);
  g.add(box(10, 0.7, 10, d, 0, 0.35, 0));
  g.add(cyl(3.4, 3.8, 2.2, 12, mc, 0, 1.8, 0));
  g.add(dome(3.4, mc, 0, 2.9, 0));
  g.add(box(1.3, 0.9, 1.3, hi, 0, 6.2, 0));
  g.add(cyl(0.12, 0.12, 1.8, 6, hi, 0, 7.5, 0));
  g.add(cone(0.95, 0.45, 10, hi, 0, 7.2, 0));
  g.add(cone(0.7, 0.4, 10, hi, 0, 7.8, 0));
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2;
    g.add(box(7.5, 1.4, 0.5, d, Math.sin(a) * 4.6, 0.9, Math.cos(a) * 4.6));
  }
  return g;
}

function temple(mc) {
  const g = group(), d = shade(mc, -0.16), hi = shade(mc, 0.1);
  g.add(box(10, 0.9, 10, d, 0, 0.45, 0));
  g.add(box(5.6, 4.2, 5.6, mc, 0, 3.0, 0));
  let w = 5.6, y = 5.1;
  for (let i = 0; i < 6; i++) { g.add(box(w, 1.15, w, mc, 0, y + 0.55, 0)); y += 1.15; w -= 0.62; }
  g.add(sph(0.85, hi, 0, y + 0.6, 0));
  g.add(cone(0.5, 1.5, 8, hi, 0, y + 1.9, 0));
  g.add(box(3.4, 3.2, 3.4, mc, 5.2, 2.0, 0));
  g.add(cone(2.6, 1.4, 4, d, 5.2, 4.3, 0));
  return g;
}

function caves(mc) {
  const g = group(), rockC = shade(mc, -0.22), dark = shade(mc, -0.5);
  const big = new THREE.Mesh(new THREE.IcosahedronGeometry(7, 0), mat(rockC));
  big.scale.set(1.7, 1.05, 1.0); big.position.set(0, 3.6, 0);
  big.castShadow = big.receiveShadow = true; g.add(big);
  for (let i = -1; i <= 1; i++) {
    g.add(box(1.9, 2.9, 0.7, dark, i * 3.0, 2.4, 6.4));
    if (i < 1) g.add(cyl(0.35, 0.35, 3.0, 6, shade(mc, -0.05), i * 3.0 + 1.5, 2.5, 6.3));
  }
  g.add(box(2.2, 3.4, 0.7, dark, 0, 3.2, 6.6));
  return g;
}

function monolith(mc) {
  const g = group(), d = shade(mc, -0.2), hi = shade(mc, 0.1);
  g.add(frustum(5.2, 8.2, 4.4, d, 0, 2.2, 0));
  g.add(box(5.0, 3.4, 5.0, mc, 0, 6.1, 0));
  let w = 5.0, y = 7.8;
  for (let i = 0; i < 5; i++) { g.add(box(w, 1.0, w, mc, 0, y + 0.5, 0)); y += 1.0; w -= 0.6; }
  g.add(dome(1.5, hi, 0, y, 0));
  g.add(cone(0.45, 1.6, 8, hi, 0, y + 1.9, 0));
  g.add(box(3.0, 2.6, 3.0, mc, 5.4, 5.7, 0));
  return g;
}

function hoysala(mc) {
  const g = group(), d = shade(mc, -0.18), hi = shade(mc, 0.12);
  g.add(starBase(5.4, 4.4, 16, 0.9, d, 0, 0, 0));
  g.add(box(4.4, 2.8, 4.4, mc, 0, 2.3, 0));
  g.add(latheTower(5.0, mc, 0, 3.6, 0));
  g.add(sph(0.55, hi, 0, 8.9, 0));
  g.add(starBase(2.6, 2.1, 16, 0.6, d, 5.2, 0, 0));
  g.add(box(2.4, 2.0, 2.4, mc, 5.2, 1.6, 0));
  g.add(cone(1.9, 1.2, 8, d, 5.2, 3.2, 0));
  return g;
}

function gopuram(mc) {
  const g = group(), d = shade(mc, -0.18), hi = shade(mc, 0.12), dark = shade(mc, -0.5);
  g.add(box(12, 1.1, 12, d, 0, 0.55, 0));
  let w = 10, y = 1.1;
  for (let i = 0; i < 9; i++) { g.add(box(w, 1.25, w, mc, 0, y + 0.62, 0)); y += 1.25; w -= 0.85; }
  g.add(box(2.6, 1.2, 2.6, hi, 0, y + 0.6, 0));
  g.add(dome(1.3, hi, 0, y + 1.2, 0));
  g.add(cone(0.4, 1.6, 8, hi, 0, y + 2.8, 0));
  g.add(box(2.6, 3.4, 0.6, dark, 0, 2.2, 6.05));
  return g;
}

function chariot(mc) {
  const g = group(), d = shade(mc, -0.18), hi = shade(mc, 0.12);
  const wl = cyl(1.6, 1.6, 0.55, 14, d, -1.7, 1.6, 0); wl.rotation.z = Math.PI / 2; g.add(wl);
  const wr = cyl(1.6, 1.6, 0.55, 14, d, 1.7, 1.6, 0); wr.rotation.z = Math.PI / 2; g.add(wr);
  g.add(cyl(0.16, 0.16, 4.0, 8, d, 0, 1.6, 0)).rotation.z = Math.PI / 2;
  g.add(box(3.4, 2.6, 2.4, mc, 0, 3.4, 0));
  for (const sx of [-1.3, 1.3]) for (const sz of [-0.9, 0.9]) g.add(cyl(0.22, 0.22, 2.0, 8, hi, sx, 5.7, sz));
  g.add(cone(2.5, 2.2, 4, mc, 0, 7.6, 0));
  g.add(sph(0.4, hi, 0, 8.8, 0));
  return g;
}

function fort(mc) {
  const g = group(), d = shade(mc, -0.2), hi = shade(mc, 0.12), rockC = shade(mc, -0.34);
  g.add(rock(11, 19, 8, 7, rockC, 0, 4, 0));
  const R = 9.6;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const wall = box(3.4, 2.0, 0.9, mc, Math.sin(a) * R, 8.9, Math.cos(a) * R);
    wall.rotation.y = a; g.add(wall);
    const mer = box(0.7, 0.7, 0.9, d, Math.sin(a) * R, 10.2, Math.cos(a) * R); mer.rotation.y = a; g.add(mer);
  }
  g.add(box(4.4, 3.4, 4.4, mc, 0, 10.5, 0));
  g.add(cyl(1.5, 1.5, 2.4, 8, d, 0, 12.5, 0));
  g.add(cone(1.9, 1.6, 8, hi, 0, 14.3, 0));
  g.add(box(2.8, 3.0, 1.2, d, 0, 8.6, 9.4));
  return g;
}

function domeBuild(mc) {
  const g = group(), d = shade(mc, -0.16), hi = shade(mc, 0.12);
  g.add(box(12, 8.5, 12, mc, 0, 4.25, 0));
  g.add(cyl(6.6, 6.6, 0.7, 18, d, 0, 8.7, 0));
  g.add(dome(6.6, mc, 0, 8.9, 0));
  g.add(cyl(0.2, 0.2, 2.4, 6, hi, 0, 15.6, 0));
  g.add(cone(0.7, 0.6, 8, hi, 0, 15.0, 0));
  for (const sx of [-5.6, 5.6]) for (const sz of [-5.6, 5.6]) {
    g.add(cyl(1.4, 1.4, 12, 8, d, sx, 6, sz));
    g.add(dome(1.6, mc, sx, 12, sz));
    g.add(cone(0.35, 1.2, 8, hi, sx, 13.8, sz));
  }
  return g;
}

function palace(mc) {
  const g = group(), d = shade(mc, -0.16), hi = shade(mc, 0.12);
  g.add(box(22, 7.5, 14, mc, 0, 3.75, 0));
  g.add(box(23.5, 1.0, 15.5, d, 0, 7.9, 0));
  g.add(cyl(3.6, 3.6, 2.4, 18, mc, 0, 9.6, 0));
  g.add(dome(4.2, mc, 0, 10.8, 0));
  for (let a = 0; a < 12; a++) { const ang = a / 12 * Math.PI * 2;
    g.add(box(0.4, 0.6, 0.12, '#ffe6a8', Math.sin(ang) * 3.62, 9.8, Math.cos(ang) * 3.62, { emissive: '#ffb347', emissiveIntensity: 0.95 })); }
  g.add(cyl(0.22, 0.22, 2.6, 6, hi, 0, 16.0, 0));
  g.add(cone(0.8, 0.7, 8, hi, 0, 15.3, 0));
  for (const sx of [-8, 8]) {
    g.add(cyl(2.0, 2.0, 1.6, 14, mc, sx, 9.0, 0));
    g.add(dome(2.6, mc, sx, 9.7, 0));
    g.add(cone(0.4, 1.3, 8, hi, sx, 12.9, 0));
  }
  for (let i = -3; i <= 3; i++) {
    g.add(box(1.4, 3.2, 0.6, d, i * 2.9, 2.4, 7.1));
    g.add(cyl(0.7, 0.7, 3.4, 10, mc, i * 2.9, 2.6, 7.3));
    for (let j = 0; j < 2; j++)
      g.add(box(0.55, 0.8, 0.12, '#ffe6a8', i * 2.9, 1.5 + j * 1.7, 7.4, { emissive: '#ffb347', emissiveIntensity: 0.95 }));
  }
  for (const sx of [-8, 8])
    g.add(box(0.6, 1.0, 0.2, '#ffe6a8', sx, 9.0, 2.1, { emissive: '#ffb347', emissiveIntensity: 0.9 }));
  return g;
}

function statue(mc) {
  const g = group(), d = shade(mc, -0.22), hi = shade(mc, 0.1), rockC = shade(mc, -0.34);
  g.add(rock(9, 14, 5.5, 7, rockC, 0, 2.75, 0));
  g.add(cyl(1.5, 1.7, 7.5, 12, mc, 0, 9.3, 0));
  g.add(sph(1.15, mc, 0, 14.1, 0));
  for (const sx of [-1.35, 1.35]) { const arm = cyl(0.42, 0.42, 6.2, 8, mc, sx, 9.4, 0); arm.rotation.z = sx > 0 ? -0.06 : 0.06; g.add(arm); }
  g.add(cyl(0.9, 1.1, 1.4, 10, hi, 0, 5.9, 0));
  return g;
}

function mantapa(mc) {
  const g = group(), d = shade(mc, -0.18), hi = shade(mc, 0.12);
  g.add(box(14, 0.8, 12, d, 0, 0.4, 0));
  for (let ix = -1.5; ix <= 1.5; ix++) for (let iz = -1; iz <= 1; iz++)
    g.add(cyl(0.45, 0.45, 4.4, 8, mc, ix * 3.6, 2.9, iz * 3.6));
  g.add(box(15, 0.9, 13, mc, 0, 5.5, 0));
  g.add(box(9, 0.7, 8, mc, 0, 6.3, 0));
  g.add(dome(1.6, hi, 0, 6.6, 0));
  g.add(cone(0.4, 1.3, 8, hi, 0, 8.4, 0));
  return g;
}

function tank(mc) {
  const g = group(), d = shade(mc, -0.2), hi = shade(mc, 0.1);
  g.add(box(13, 0.7, 13, d, 0, 0.35, 0));
  g.add(box(10, 0.7, 10, mc, 0, 1.0, 0));
  g.add(box(7, 0.7, 7, mc, 0, 1.65, 0));
  g.add(box(6.2, 0.35, 6.2, '#2f7f8f', 0, 1.95, 0, { roughness: 0.2, metalness: 0.3 }));
  g.add(box(2.2, 2.4, 2.2, mc, 0, 3.0, -3.6));
  g.add(dome(1.2, hi, 0, 4.2, -3.6));
  return g;
}

const BUILDERS = { stupa, temple, caves, monolith, hoysala, gopuram, chariot, fort, dome: domeBuild, palace, statue, mantapa, tank };

export function buildMonument(type, mc) {
  return (BUILDERS[type] || temple)(mc);
}
