# ಕಾಲದ ಜಗತ್ತು · The World Through Time

A free-roam **3D world** through the dynasties of Karnataka — walk anywhere, from
c. 300 BCE to 1950 CE. Every era has its own sky, sun, fog and ground colour, its
own monuments rising from the land, and its own royal emblem (a stylised 3D animal)
wandering nearby.

Built with [Three.js](https://threejs.org/). No build step — it runs as plain ES
modules straight from the repo.

## Play

Open `index.html` (or the GitHub Pages link).

- **Desktop** — click to lock the pointer. `W A S D` / arrow keys to walk,
  mouse to look, `Shift` to run, `E` to read a monument or emblem.
- **Mobile** — the left half of the screen is a joystick; drag the right half to
  look. Tap the prompt when you reach a monument or emblem.

Walk up to a monument or a royal emblem and open it: you'll get who built it, when,
what it means, and the era's kings and sub-branches. Everything you meet fills your
**Traveller's Journal** (the ✦ button) — a stamp for each dynasty and the artifact
that belongs to it.

## The 16 eras

Shatavahanas · Kadambas · Western Gangas · Alupas · Badami Chalukyas · Rashtrakutas ·
Kalyani Chalukyas · Kalachuris · Hoysalas · Vijayanagara · Bahmani Sultanate ·
Keladi Nayakas · Chitradurga Nayakas · Haleri Rajas of Kodagu · Kitturu · Wodeyars of Mysore

Karnataka's own dynasties are the subject; the Sultanates appear once, as contemporaries.

## Source layout

```
index.html          entry point (import map for three, DOM for the HUD)
css/style.css       HUD, info cards, journal, joystick
js/config.js        the 16 eras: palettes, monuments, emblems, kings
js/lib.js           low-poly geometry helpers
js/monuments.js     procedural 3D monuments (stupa, temple, gopuram, fort…)
js/emblems.js       procedural 3D royal emblems (elephant, lion, boar, eagle…)
js/world.js         terrain, winding road, sky shader, sun, fog, scatter
js/controls.js      free-roam first-person controller (desktop + touch)
js/ui.js            HUD, onboarding, info cards, journal
js/main.js          bootstrap + render loop + interaction
```

## Notes

- Terrain height is procedural, so the road is flattened into the land and you can
  walk off it in any direction.
- Atmosphere (sky, sun angle, fog, ground tint) cross-fades between adjacent eras
  as you move along the road.
- Emblems are deliberately stylised low-poly creatures built from primitives — a
  consistent art direction rather than photoreal models.

Made for learning the kings of Karnataka by wandering among them.
