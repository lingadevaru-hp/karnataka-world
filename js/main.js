// ============================================================
//  main.js — bootstrap, render loop, proximity + interaction
// ============================================================
import * as THREE from 'three';
import { ERAS, ZONE_DEPTH } from './config.js';
import { createWorld, terrainHeight } from './world.js';
import { createControls } from './controls.js';
import { createUI } from './ui.js';

const canvas = document.getElementById('scene');

// ---------- renderer ----------
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isTouch ? 1.6 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.outputColorSpace = THREE.SRGBColorSpace;

// ---------- scene / camera ----------
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(new THREE.Color(ERAS[0].fog), ERAS[0].fogD);
const camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.1, 1400);

const world = createWorld(scene);
world.items.forEach((it, i) => { it.group.userData.itemIndex = i; });

const controls = createControls(camera, canvas, terrainHeight);
// deep-link: index.html#z=<worldZ>  or  #era=<0..15>  drops you at that era
{
  const hz = location.hash.match(/z=(-?\d+(?:\.\d+)?)/);
  const he = location.hash.match(/era=(\d+)/);
  if (hz) controls.state.pos.z = parseFloat(hz[1]);
  else if (he) controls.state.pos.z = (+he[1]) * ZONE_DEPTH;
}
let lastNear = -1;
const ui = createUI({
  isTouch,
  onOpenCard: () => { /* first interaction — nothing needed */ }
});

// ---------- interaction ----------
function openItem(i) {
  const it = world.items[i]; if (!it) return;
  ui.openCard(it);
  const isNew = ui.discover(it.era);
  const gotArt = ui.addArtifact(ERAS[it.era].artifact);
  if (isNew || gotArt) ui.toast && ui.toast();
}
addEventListener('keydown', e => {
  if (e.code === 'KeyE' && !ui.isCardOpen() && lastNear >= 0) openItem(lastNear);
  if (e.code === 'Escape') ui.closeCard();
});
document.getElementById('prompt').addEventListener('click', () => { if (lastNear >= 0) openItem(lastNear); });

// raycast taps (touch) and clicks
const ray = new THREE.Raycaster();
const ptr = new THREE.Vector2();
let downPt = null, downT = 0;
canvas.addEventListener('pointerdown', e => { downPt = { x: e.clientX, y: e.clientY }; downT = performance.now(); });
canvas.addEventListener('pointerup', e => {
  if (!downPt) return;
  const moved = Math.hypot(e.clientX - downPt.x, e.clientY - downPt.y);
  const quick = performance.now() - downT < 320;
  downPt = null;
  if (moved > 10 || !quick) return;
  ptr.x = (e.clientX / innerWidth) * 2 - 1;
  ptr.y = -(e.clientY / innerHeight) * 2 + 1;
  ray.setFromCamera(ptr, camera);
  const hits = ray.intersectObjects(world.items.map(it => it.group), true);
  if (hits.length) {
    let o = hits[0].object;
    while (o && o.userData.itemIndex === undefined) o = o.parent;
    if (o) openItem(o.userData.itemIndex);
  }
});

// ---------- resize ----------
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ---------- loop ----------
const clock = new THREE.Clock();
let started = false;
document.getElementById('startBtn').addEventListener('click', () => { started = true; });

function tick() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  controls.update(dt);
  const pz = controls.state.pos.z;
  world.update(controls.state.pos.x, pz, t, dt);

  // era label + progress
  const f = Math.max(0, Math.min(ERAS.length - 1, Math.round(pz / ZONE_DEPTH)));
  if (f !== ui._lastEra) { ui.setEra(f); ui._lastEra = f; }
  ui.setProgress(pz / (ERAS.length * ZONE_DEPTH));

  // proximity to nearest item
  let near = -1, nd = 1e9;
  world.items.forEach((it, i) => {
    const d = Math.hypot(it.x - controls.state.pos.x, it.z - controls.state.pos.z);
    if (d < nd) { nd = d; near = i; }
  });
  if (nd < 12 && near !== lastNear) {
    lastNear = near;
    ui.showPrompt(world.items[near].label);
  } else if (nd >= 12 && lastNear !== -1) {
    lastNear = -1; ui.hidePrompt();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

// hide loader once first frame is drawn
renderer.render(scene, camera);
requestAnimationFrame(() => {
  const l = document.getElementById('loading');
  l.classList.add('gone'); setTimeout(() => l.remove(), 800);
  tick();
});
