// Localization linter + parity check (brief verification checklist)
import { questionsDatabase as EN_Q, PROMPTS as EN_P } from './src/data/questions.js';
import { questionsDatabase as RU_Q, PROMPTS as RU_P } from './src/i18n/questions.ru.js';
import { questionsDatabase as FI_Q, PROMPTS as FI_P } from './src/i18n/questions.fi.js';
import { UI_EN } from './src/i18n/ui.en.js';
import { UI_RU } from './src/i18n/ui.ru.js';
import { UI_FI } from './src/i18n/ui.fi.js';
import { applyWordModifier } from './src/i18n/morphology.js';

let pass = 0, fail = 0;
const ok = (cond, label, extra = '') => {
  if (cond) { pass++; } else { fail++; console.log('FAIL', label, extra); }
};

// ---- 1. Parity ----
ok(EN_Q.length === RU_Q.length && EN_Q.length === FI_Q.length, 'question count parity', `${EN_Q.length}/${RU_Q.length}/${FI_Q.length}`);
const enIds = EN_Q.map(q => q.id).join(',');
ok(enIds === RU_Q.map(q => q.id).join(','), 'RU question IDs match EN');
ok(enIds === FI_Q.map(q => q.id).join(','), 'FI question IDs match EN');
ok(Object.keys(EN_P).length === Object.keys(RU_P).length && Object.keys(EN_P).length === Object.keys(FI_P).length, 'PROMPTS key parity',
  `${Object.keys(EN_P).length}/${Object.keys(RU_P).length}/${Object.keys(FI_P).length}`);

const flat = o => {
  const keys = [];
  (function walk(obj, pre) {
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) walk(v, pre + k + '.');
      else keys.push(pre + k);
    }
  })(o, '');
  return keys.sort();
};
const enUi = flat(UI_EN), ruUi = flat(UI_RU), fiUi = flat(UI_FI);
const miss = (a, b) => a.filter(k => !b.includes(k));
ok(JSON.stringify(enUi) === JSON.stringify(ruUi), 'RU UI keys == EN UI keys', 'missing: ' + miss(enUi, ruUi) + ' extra: ' + miss(ruUi, enUi));
ok(JSON.stringify(enUi) === JSON.stringify(fiUi), 'FI UI keys == EN UI keys', 'missing: ' + miss(enUi, fiUi) + ' extra: ' + miss(fiUi, enUi));

// fragment-structure parity (option counts per fragment)
for (const [loc, DB] of [['RU', RU_Q], ['FI', FI_Q]]) {
  for (let i = 0; i < EN_Q.length; i++) {
    const a = EN_Q[i], b = DB[i];
    if (a.fragments.length !== b.fragments.length) { ok(false, `${loc} q${a.id} frag count`, `${a.fragments.length} vs ${b.fragments.length}`); continue; }
    for (let f = 0; f < a.fragments.length; f++) {
      ok(a.fragments[f].options.length === b.fragments[f].options.length, `${loc} q${a.id} frag${f} option count`, `${a.fragments[f].options.length} vs ${b.fragments[f].options.length}`);
    }
  }
}

// ---- 2. Morphology assertions (brief checklist) ----
const T = (w, m, l, want) => ok(applyWordModifier(w, m, l).text === want, `morph ${l}/${m}/${w}`, `-> ${applyWordModifier(w, m, l).text} want ${want}`);
T('ЧАЙ', 'ism', 'ru', 'ЧАИЗМ'); T('ЗМЕЯ', 'ism', 'ru', 'ЗМЕИЗМ'); T('КОТ', 'ism', 'ru', 'КОТИЗМ');
T('СОБАКА', 'land', 'ru', 'СОБАКОЛЯНДИЯ'); T('СОБАКА', 'grad', 'ru', 'СОБАКОГРАД');
T('ЧАЙ', 'land', 'ru', 'ЧАЕЛЯНДИЯ'); T('ЧАЙ', 'grad', 'ru', 'ЧАЕГРАД');
T('KIRJAHYLLY', 'la', 'fi', 'KIRJAHYLLYLÄ'); T('KAHVIPÖYTÄ', 'la', 'fi', 'KAHVIPÖYTÄLÄ');
T('AMPIAINEN', 'la', 'fi', 'AMPIAISLA'); T('TEE', 'ismi', 'fi', 'TEEISMI'); T('IHMINEN', 'ismi', 'fi', 'IHMISISMI');

// ---- 3. Concatenation linter: Cartesian product of compatible fragments ----
// Rule (mirrors getValidFragmentOptions): option of frag j is usable when
// !requires || requires ∩ activeTypes ≠ ∅ ; activeTypes = types of earlier picks.
function* combos(frags, idx = 0, activeTypes = [], acc = []) {
  if (idx === frags.length) { yield acc; return; }
  for (const opt of frags[idx].options) {
    const okReq = !opt.requires || opt.requires.length === 0 || opt.requires.some(r => activeTypes.includes(r));
    if (!okReq) continue;
    yield* combos(frags, idx + 1, opt.type ? [...activeTypes, opt.type] : activeTypes, [...acc, opt.text]);
  }
  // fallback parity with game: if nothing valid, all options usable
  if (![...combos(frags, idx + 1, activeTypes, acc)].length && frags[idx].options.length) {
    for (const opt of frags[idx].options) {
      yield* combos(frags, idx + 1, opt.type ? [...activeTypes, opt.type] : activeTypes, [...acc, opt.text]);
    }
  }
}

const countPairs = (s, a, b) => (s.match(new RegExp(`\\${a}`, 'g')) || []).length === (s.match(new RegExp(`\\${b}`, 'g')) || []).length;
const PROBLEMS = [];
for (const [loc, DB] of [['EN', EN_Q], ['RU', RU_Q], ['FI', FI_Q]]) {
  let n = 0;
  for (const q of DB) {
    const stem = q.text || '';
    for (const parts of combos(q.fragments)) {
      n++;
      const s = [stem, ...parts].join(' ');
      const issues = [];
      if (/  +/.test(s)) issues.push('double space');
      if (!countPairs(s, '«', '»')) issues.push('unbalanced «»');
      if (/«[^»]*«/.test(s) || /»[^«]*»/.test(s)) issues.push('nested «»');
      // unclosed Finnish quotes ”...” (same char open/close -> count must be even)
      const dbl = (s.match(/”/g) || []).length;
      if (dbl % 2 !== 0) issues.push('odd ” count');
      if (/,\s*\?/.test(s)) issues.push('comma before ?');
      if (/[,:;]\s*[,:;]/.test(s)) issues.push('double punctuation');
      if (!/[?.!…]\s*$/.test(s) && !s.includes('[ ... ]') && !s.includes('[PREV_CHOICE]')) {
        if (!/[?.!:]$/.test(s)) issues.push('no ending punctuation');
      }
      if (/[а-яА-ЯёЁa-zA-ZäöåÄÖÅ][«»”]$/.test(s) === false && /[^?.!»:»”\s]$/.test(s)) issues.push('trailing junk char');
      if (issues.length) PROBLEMS.push(`${loc} q${q.id}: [${issues.join('; ')}] :: ${s.slice(0, 130)}`);
    }
  }
  console.log(`${loc}: ${n} combinations linted`);
}
console.log('--- lint problems ---');
PROBLEMS.forEach(p => console.log(p));
console.log(`\n=== ${pass} PASS / ${fail} FAIL ; ${PROBLEMS.length} lint findings ===`);
