// ============================================================
//  ui.js — HUD, onboarding, info cards, traveller's journal
// ============================================================
import { ERAS } from './config.js';

const $ = id => document.getElementById(id);

export function createUI({ isTouch, onOpenCard }) {
  const discovered = new Set();
  const artifacts = new Set();
  let cardOpen = false;

  // ---------- era label + progress ----------
  function setEra(i) {
    const e = ERAS[i];
    $('eraName').textContent = e.kn;
    $('eraEn').textContent = e.en;
    $('eraYears').textContent = e.years;
    document.documentElement.style.setProperty('--accent', e.mat);
  }
  function setProgress(p) { $('progFill').style.width = (p * 100).toFixed(1) + '%'; }

  // ---------- proximity prompt ----------
  function showPrompt(label) {
    const p = $('prompt');
    p.querySelector('span').textContent = label;
    p.classList.add('on');
  }
  function hidePrompt() { $('prompt').classList.remove('on'); }

  // ---------- info card ----------
  function openCard(data) {
    cardOpen = true;
    document.documentElement.style.setProperty('--accent', ERAS[data.era].mat);
    $('cKicker').textContent = data.tag || '';
    $('cTitle').textContent = data.title;
    $('cSub').textContent = data.sub;
    $('cBody').textContent = data.body;
    const e = ERAS[data.era];
    $('cKings').innerHTML = e.kings.map(k => `<li><span class="kn">${k[0]}</span> <span class="en">${k[1]}</span><span class="yr">${k[2]}</span></li>`).join('');
    const subs = e.subs && e.subs.length;
    $('cSubsHead').style.display = subs ? 'flex' : 'none';
    $('cSubs').style.display = subs ? 'block' : 'none';
    $('cSubs').innerHTML = subs ? e.subs.map(s => `<li><span class="kn">${s[0]}</span> <span class="en">${s[1]}</span><span class="yr">${s[2]}</span></li>`).join('') : '';
    $('card').classList.add('on');
  }
  function closeCard() { cardOpen = false; $('card').classList.remove('on'); }
  $('cardClose').addEventListener('click', closeCard);

  // ---------- discovery + journal ----------
  function discover(i) {
    if (discovered.has(i)) return false;
    discovered.add(i);
    $('jBadge').textContent = discovered.size;
    return true;
  }
  function addArtifact(name) { if (artifacts.has(name)) return false; artifacts.add(name); return true; }

  function renderJournal() {
    $('jStamps').innerHTML = ERAS.map((e, i) => {
      const got = discovered.has(i);
      return `<div class="stamp ${got ? 'got' : ''}">
        <div class="sym" style="background:${got ? e.mat : 'rgba(255,255,255,.06)'}">${got ? e.emblem[1] : '?'}</div>
        <div class="nm">${got ? e.kn : 'ಮುಚ್ಚಿದೆ'}</div>
        <div class="yr">${got ? e.years : ''}</div></div>`;
    }).join('');
    $('jArts').innerHTML = ERAS.map((e, i) => {
      const got = artifacts.has(e.artifact);
      return `<div class="art ${got ? '' : 'locked'}"><div class="ic">${got ? '◈' : '◇'}</div>
        <div class="tx"><div class="k">${got ? e.artifact : 'ಅಜ್ಞಾತ ಅವಶೇಷ'}</div><div class="s">${e.kn}</div></div></div>`;
    }).join('');
    $('jProgress').textContent = discovered.size + ' / ' + ERAS.length + ' ರಾಜವಂಶಗಳು';
  }
  function openJournal() { renderJournal(); $('journal').classList.add('on'); }
  function closeJournal() { $('journal').classList.remove('on'); }
  $('journalBtn').addEventListener('click', openJournal);
  $('jClose').addEventListener('click', closeJournal);

  // ---------- help / intro ----------
  function openHelp() { $('help').classList.add('on'); }
  function closeHelp() { $('help').classList.remove('on'); }
  $('helpBtn').addEventListener('click', openHelp);
  $('helpClose').addEventListener('click', closeHelp);

  $('startBtn').addEventListener('click', () => { $('intro').classList.remove('on'); onOpenCard && onOpenCard(); });

  // control legend text depends on device
  if (isTouch) {
    $('helpLegend').innerHTML = '<li><b>ಎಡ ಜಾಯ್ಸ್ಟಿಕ್</b> — ನಡೆಯಲು</li><li><b>ಬಲ ಬದಿ ಎಳೆಯಿರಿ</b> — ನೋಡಲು</li><li><b>ಒತ್ತಿರಿ</b> — ಸ್ಮಾರಕ/ಪ್ರಾಣಿ ಓದಲು</li>';
    $('introLegend').innerHTML = '<li><b>ಎಡ ಜಾಯ್ಸ್ಟಿಕ್</b> ನಡೆಯಲು · <b>ಬಲ ಎಳೆತ</b> ನೋಡಲು</li><li>ಸ್ಮಾರಕ ಮತ್ತು ಪ್ರಾಣಿ ಲಾಂಛನಗಳ ಬಳಿ ಹೋಗಿ ಒತ್ತಿ</li><li><b>✦</b> ನಿಮ್ಮ ಪಯಣದ ಪುಸ್ತಕ</li>';
  }

  return { setEra, setProgress, showPrompt, hidePrompt, openCard, closeCard,
    discover, addArtifact, openJournal, closeJournal, openHelp, closeHelp,
    isCardOpen: () => cardOpen, discovered, artifacts };
}
