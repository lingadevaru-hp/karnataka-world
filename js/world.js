// ============================================================
//  world.js — terrain, winding road, sky, sun, fog, scatter,
//  and placement of every era's monuments + royal emblem.
// ============================================================
import * as THREE from 'three';
import { ERAS, ZONE_DEPTH, WORLD_W, roadX, eraZ } from './config.js';
import { buildMonument } from './monuments.js';
import { buildEmblem } from './emblems.js';
import { box, cyl, cone, mat } from './lib.js';

const N = ERAS.length;
const Z_START = -ZONE_DEPTH, Z_END = N * ZONE_DEPTH + ZONE_DEPTH;
const LEN = Z_END - Z_START;

const _c = new THREE.Color();
function eraBlendAt(z, key) {
  // era i is centred at z = i*ZONE_DEPTH  →  c = z/ZONE_DEPTH, pure at c = i
  const c = (z - Z_START) / ZONE_DEPTH - 1;
  let i0 = Math.floor(c), frac = c - i0;
  i0 = Math.max(0, Math.min(N - 1, i0));
  const i1 = Math.max(0, Math.min(N - 1, i0 + 1));
  const a = new THREE.Color(ERAS[i0][key]), b = new THREE.Color(ERAS[i1][key]);
  return a.lerp(b, Math.max(0, Math.min(1, frac)));
}

export function terrainHeight(x, z) {
  const roadD = Math.abs(x - roadX(z));
  const flat = roadD < 7 ? 0.12 : roadD > 34 ? 1 : 0.12 + 0.88 * ((roadD - 7) / 27);
  const h = 3.6 * Math.sin(x * 0.013) * Math.cos(z * 0.011)
          + 1.7 * Math.sin(z * 0.031 + 0.7)
          + 1.3 * Math.cos(x * 0.033)
          + 0.9 * Math.sin((x + z) * 0.05);
  return h * flat;
}

export function createWorld(scene) {
  const world = { items: [], emblemAnims: [], eraMarks: [] };

  // ---------------- terrain ----------------
  const SX = 120, SZ = 170;
  const geo = new THREE.PlaneGeometry(WORLD_W * 2, LEN, SX, SZ);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i) + (Z_START + LEN / 2);
    pos.setX(i, x); pos.setZ(i, z);
    pos.setY(i, terrainHeight(x, z));
    const c = eraBlendAt(z, 'ground');
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const terrain = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1, metalness: 0 }));
  terrain.receiveShadow = true;
  scene.add(terrain);
  world.terrain = terrain;

  // ---------------- road ribbon ----------------
  const steps = 300, half = 4.6;
  const rpos = [], rcol = [], rindex = [];
  for (let s = 0; s <= steps; s++) {
    const z = Z_START + (s / steps) * LEN;
    const cx = roadX(z);
    for (const side of [-1, 1]) {
      const x = cx + side * half;
      rpos.push(x, terrainHeight(x, z) + 0.09, z);
      const c = eraBlendAt(z, 'road');
      rcol.push(c.r, c.g, c.b);
    }
  }
  for (let s = 0; s < steps; s++) {
    const a = s * 2, b = s * 2 + 1, c2 = s * 2 + 2, d = s * 2 + 3;
    rindex.push(a, c2, b, b, c2, d);
  }
  const rgeo = new THREE.BufferGeometry();
  rgeo.setAttribute('position', new THREE.Float32BufferAttribute(rpos, 3));
  rgeo.setAttribute('color', new THREE.Float32BufferAttribute(rcol, 3));
  rgeo.setIndex(rindex); rgeo.computeVertexNormals();
  const road = new THREE.Mesh(rgeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }));
  road.receiveShadow = true; scene.add(road);

  // ---------------- sky ----------------
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color(ERAS[0].skyTop) }, bot: { value: new THREE.Color(ERAS[0].skyBot) } },
    vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vP; uniform vec3 top; uniform vec3 bot;
      void main(){ float h = clamp(normalize(vP).y*0.5+0.5, 0.0, 1.0); gl_FragColor = vec4(mix(bot, top, smoothstep(0.35,1.0,h)), 1.0); }`
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(900, 32, 20), skyMat);
  scene.add(sky);

  // ---------------- lights ----------------
  const hemi = new THREE.HemisphereLight(ERAS[0].skyTop, ERAS[0].ground, 1.25); scene.add(hemi);
  scene.add(new THREE.AmbientLight(0xffffff, 0.22));
  const sun = new THREE.DirectionalLight(ERAS[0].sun, ERAS[0].sunI);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera; sc.near = 1; sc.far = 520; sc.left = -95; sc.right = 95; sc.top = 95; sc.bottom = -95;
  sc.updateProjectionMatrix();
  scene.add(sun); scene.add(sun.target);

  const sunDisc = new THREE.Mesh(new THREE.SphereGeometry(18, 16, 12),
    new THREE.MeshBasicMaterial({ color: ERAS[0].sun, fog: false }));
  scene.add(sunDisc);

  // ---------------- scatter (trees + rocks) ----------------
  const rnd = mulberry(1337);
  for (let i = 0; i < N; i++) {
    const zc = eraZ(i);
    const foliage = eraBlendAt(zc, 'ground').clone().offsetHSL(0.02, 0.05, 0.12);
    const trunkC = eraBlendAt(zc, 'ground').clone().offsetHSL(0, -0.02, -0.16);
    const rockC = eraBlendAt(zc, 'mat').clone().offsetHSL(0, -0.03, -0.12);
    for (let t = 0; t < 26; t++) {
      const z = zc + (rnd() - 0.5) * ZONE_DEPTH * 0.96;
      let x = (rnd() - 0.5) * WORLD_W * 1.8;
      if (Math.abs(x - roadX(z)) < 26) x += 34 * Math.sign(x - roadX(z) || 1);
      const y = terrainHeight(x, z);
      const g = new THREE.Group(); g.position.set(x, y, z);
      if (rnd() < 0.72) {
        const h = 4 + rnd() * 4;
        const trunk = cyl(0.28, 0.4, h * 0.5, 6, '#' + trunkC.getHexString(), 0, h * 0.25, 0);
        const crown = cone(1.5 + rnd(), h, 7, '#' + foliage.getHexString(), 0, h * 0.5 + h * 0.35, 0);
        g.add(trunk, crown);
      } else {
        const r = 1 + rnd() * 2.4;
        const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat('#' + rockC.getHexString()));
        rock.position.y = r * 0.5; rock.castShadow = rock.receiveShadow = true; g.add(rock);
      }
      g.rotation.y = rnd() * 6.28;
      scene.add(g);
    }
  }

  // ---------------- era content: monuments + emblems ----------------
  ERAS.forEach((e, i) => {
    const zc = eraZ(i);
    e.monuments.forEach((m, mi) => {
      const [type, label, note, ox] = m;
      const x = roadX(zc + mi * 8) + ox;
      const z = zc + 22 + (mi - (e.monuments.length - 1) / 2) * 15;
      const g = buildMonument(type, e.mat);
      g.position.set(x, terrainHeight(x, z), z);
      g.rotation.y = -Math.atan2(roadX(z) - x, 0.0001) + Math.PI / 2;
      g.rotation.y = (x > roadX(z) ? -1 : 1) * 0.5;
      scene.add(g);
      world.items.push({ kind: 'monument', group: g, x, z, era: i, label, note,
        title: label, sub: e.kn + ' · ' + e.years, body: note, tag: 'ಇವರು ಕಟ್ಟಿದ್ದು' });
    });

    const [etype, ename, emeaning, eox] = e.emblem;
    const ex = roadX(zc) + eox, ez = zc + 34;
    const em = buildEmblem(etype, e.mat);
    em.g.position.set(ex, terrainHeight(ex, ez), ez);
    em.g.rotation.y = eox > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(em.g);
    world.items.push({ kind: 'emblem', group: em.g, x: ex, z: ez, era: i, label: ename,
      title: ename, sub: e.kn + ' · ರಾಜ ಲಾಂಛನ', body: emeaning, tag: 'ರಾಜ ಲಾಂಛನ' });
    world.emblemAnims.push({ obj: em, baseX: ex, baseZ: ez, phase: rnd() * 6.28, speed: 0.35 + rnd() * 0.2, range: 4.5 });
  });

  // ---------------- atmosphere update ----------------
  const tmpA = new THREE.Color(), tmpB = new THREE.Color();
  world.update = function (px, playerZ, t, dt) {
    const st = eraBlendAt(playerZ, 'skyTop'), sb = eraBlendAt(playerZ, 'skyBot');
    skyMat.uniforms.top.value.copy(st); skyMat.uniforms.bot.value.copy(sb);
    sky.position.set(px, 0, playerZ);

    // sun angle/colour/intensity blend across the boundary
    const f = (playerZ - Z_START) / ZONE_DEPTH - 1;
    let i = Math.max(0, Math.min(N - 1, Math.round(f)));
    const e = ERAS[i];
    const sunCol = new THREE.Color(e.sun);
    sun.color.lerp(sunCol, 0.05);
    sun.intensity += (e.sunI - sun.intensity) * 0.05;
    hemi.color.lerp(new THREE.Color(e.skyTop), 0.05);
    hemi.groundColor.lerp(new THREE.Color(e.ground), 0.05);
    const az = e.sunAz * Math.PI / 180, el = e.sunEl * Math.PI / 180;
    const dir = new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az));
    const anchor = new THREE.Vector3(px, 0, playerZ);
    const sunPos = dir.clone().multiplyScalar(240).add(anchor);
    sun.position.lerp(sunPos, 0.06);
    sun.target.position.set(px, 0, playerZ); sun.target.updateMatrixWorld();
    sunDisc.position.lerp(dir.clone().multiplyScalar(600).add(anchor), 0.06);
    sunDisc.material.color.copy(sun.color);

    const fogCol = eraBlendAt(playerZ, 'fog');
    scene.fog.color.copy(fogCol);
    const fogD = ERAS[i].fogD;
    scene.fog.density += (fogD - scene.fog.density) * 0.05;

    // animate emblems: walk back and forth + leg/wing motion
    world.emblemAnims.forEach(a => {
      const w = Math.sin(t * a.speed + a.phase);
      const x = a.baseX + w * a.range, z = a.baseZ + Math.cos(t * a.speed * 0.7 + a.phase) * a.range * 0.4;
      a.obj.g.position.set(x, terrainHeight(x, z), z);
      const dir2 = Math.cos(t * a.speed + a.phase) >= 0 ? 1 : -1;
      const targetRot = dir2 * Math.PI / 2;
      a.obj.g.rotation.y += (targetRot - a.obj.g.rotation.y) * 0.03;
      const swing = Math.sin(t * 6 + a.phase) * 0.5;
      a.obj.legs.forEach((l, k) => l.rotation.x = swing * (k % 2 === 0 ? 1 : -1));
      a.obj.wings.forEach((wg, k) => wg.rotation.z = Math.sin(t * 3 + a.phase) * 0.35 * (k === 0 ? 1 : 1));
      a.obj.g.position.y += Math.sin(t * 2 + a.phase) * 0.05;
    });
  };

  return world;
}

function mulberry(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
