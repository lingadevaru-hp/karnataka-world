// ============================================================
//  controls.js — free-roam first-person controller
//  Desktop: click to lock the pointer, WASD/arrows, mouse look.
//  Mobile:  on-screen joystick to move, drag anywhere to look.
// ============================================================
import * as THREE from 'three';
import { ZONE_DEPTH, WORLD_W } from './config.js';

const Z_MIN = -ZONE_DEPTH + 6;
const Z_MAX = 16 * ZONE_DEPTH + ZONE_DEPTH - 6;

export function createControls(camera, dom, heightFn) {
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  const state = {
    yaw: Math.PI, pitch: -0.06, pos: new THREE.Vector3(0, 0, Z_MIN + 8),
    speed: 13.5, running: false, locked: false, bob: 0
  };
  camera.rotation.order = 'YXZ';

  const keys = Object.create(null);
  const move = { x: 0, y: 0 };          // -1..1 from joystick / keys

  // ---------- keyboard ----------
  addEventListener('keydown', e => { keys[e.code] = true; if (e.code === 'Space') e.preventDefault(); });
  addEventListener('keyup', e => { keys[e.code] = false; });

  // ---------- desktop pointer lock ----------
  dom.addEventListener('click', () => { if (!isTouch && !state.locked) dom.requestPointerLock(); });
  document.addEventListener('pointerlockchange', () => { state.locked = document.pointerLockElement === dom; });
  document.addEventListener('mousemove', e => {
    if (!state.locked) return;
    state.yaw -= e.movementX * 0.0022;
    state.pitch = Math.max(-1.2, Math.min(1.2, state.pitch - e.movementY * 0.0022));
  });

  // ---------- touch: joystick + look ----------
  let joyId = null, lookId = null, joyBase = null, lookLast = null;
  const joy = document.createElement('div'); joy.className = 'joy'; joy.innerHTML = '<div class="joyKnob"></div>';
  const knob = joy.firstChild;
  if (isTouch) document.body.appendChild(joy);

  function joyAt(x, y) {
    const r = 62;
    let dx = x - joyBase.x, dy = y - joyBase.y;
    const d = Math.hypot(dx, dy);
    if (d > r) { dx = dx / d * r; dy = dy / d * r; }
    knob.style.transform = `translate(${dx}px,${dy}px)`;
    move.x = dx / r; move.y = dy / r;
  }

  dom.addEventListener('pointerdown', e => {
    if (!isTouch) return;
    const leftZone = e.clientX < innerWidth * 0.5 && e.clientY > innerHeight * 0.5;
    if (leftZone && joyId === null) {
      joyId = e.pointerId; joyBase = { x: e.clientX, y: e.clientY };
      joy.style.left = (e.clientX - 62) + 'px'; joy.style.top = (e.clientY - 62) + 'px';
      joy.classList.add('on'); joyAt(e.clientX, e.clientY);
    } else if (lookId === null) {
      lookId = e.pointerId; lookLast = { x: e.clientX, y: e.clientY };
    }
  });
  dom.addEventListener('pointermove', e => {
    if (!isTouch) return;
    if (e.pointerId === joyId) joyAt(e.clientX, e.clientY);
    else if (e.pointerId === lookId && lookLast) {
      state.yaw -= (e.clientX - lookLast.x) * 0.005;
      state.pitch = Math.max(-1.2, Math.min(1.2, state.pitch - (e.clientY - lookLast.y) * 0.005));
      lookLast = { x: e.clientX, y: e.clientY };
    }
  });
  function endPointer(e) {
    if (e.pointerId === joyId) { joyId = null; move.x = 0; move.y = 0; joy.classList.remove('on'); knob.style.transform = ''; }
    if (e.pointerId === lookId) { lookId = null; lookLast = null; }
  }
  dom.addEventListener('pointerup', endPointer);
  dom.addEventListener('pointercancel', endPointer);

  // ---------- per-frame ----------
  const fwd = new THREE.Vector3(), right = new THREE.Vector3(), vel = new THREE.Vector3();
  function update(dt) {
    // gather move input
    let mx = move.x, my = move.y;
    if (keys['KeyW'] || keys['ArrowUp']) my -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) my += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) mx -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) mx += 1;
    state.running = !!(keys['ShiftLeft'] || keys['ShiftRight']);

    const len = Math.hypot(mx, my);
    if (len > 1) { mx /= len; my /= len; }

    fwd.set(-Math.sin(state.yaw), 0, -Math.cos(state.yaw));
    right.set(Math.cos(state.yaw), 0, -Math.sin(state.yaw));
    vel.set(0, 0, 0).addScaledVector(fwd, -my).addScaledVector(right, mx);
    const sp = state.speed * (state.running ? 1.9 : 1);
    state.pos.addScaledVector(vel, sp * dt);

    state.pos.x = Math.max(-WORLD_W + 8, Math.min(WORLD_W - 8, state.pos.x));
    state.pos.z = Math.max(Z_MIN, Math.min(Z_MAX, state.pos.z));

    // head bob when moving
    const moving = len > 0.05;
    state.bob += dt * (moving ? (state.running ? 14 : 9) : 0);
    const bobY = moving ? Math.sin(state.bob) * 0.09 : 0;

    const groundY = heightFn(state.pos.x, state.pos.z);
    camera.position.set(state.pos.x, groundY + 1.7 + bobY, state.pos.z);
    camera.rotation.y = state.yaw;
    camera.rotation.x = state.pitch;
  }

  return { state, update, isTouch };
}
