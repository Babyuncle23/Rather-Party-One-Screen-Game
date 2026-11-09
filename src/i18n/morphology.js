// =====================================================================
// MORPHOLOGY ENGINE (Sprint 4)
// Locale-aware word-modifier detection + transformation.
//
// Question templates embed affix markers around the [ ... ] slot, e.g.
//   EN:  "rename your country to [ ... ]land"
//   RU:  "переименовать страну в [ ... ]ляндия"
//   FI:  "nimetään maa uudelleen: [ ... ]maa"
// At submit time we detect the marker, transform each player word
// (stem changes, epenthesis, vowel harmony), strip the marker text from
// the template, and keep the appended tail unmasked as a free clue.
// =====================================================================

import { escapeRegExp } from '../utils/sanitize.js';

// Detection tables. `detect` is the literal template text adjacent to
// "[ ... ]" (case-insensitive). Order is enforced by detect length.
//   kind: 'suffix'  -> "[ ... ]${detect}" ; transformed word keeps `detect`-derived tail visible
//   kind: 'wrapper' -> "${detect}[ ... ]" ; template phrase wraps the word (combo uses before/after)
export const WORD_MODIFIERS = {
  en: [
    { kind: 'wrapper', type: 'republic', detect: 'The Republic of ', before: 'THE REPUBLIC OF ', after: '' },
    { kind: 'wrapper', type: 'holiday',  detect: 'The Day of ',      before: 'THE DAY OF ',      after: '' },
    { kind: 'suffix',  type: 'ism',      detect: 'ism' },
    { kind: 'suffix',  type: 'land',     detect: 'land' },
    { kind: 'suffix',  type: 'ville',    detect: 'ville' },
    { kind: 'suffix',  type: 'field',    detect: 'field' }
  ],
  ru: [
    { kind: 'wrapper', type: 'republic', detect: 'Республика «', before: 'РЕСПУБЛИКА «', after: '»' },
    { kind: 'wrapper', type: 'holiday',  detect: 'День ',        before: 'ДЕНЬ ',        after: '' },
    { kind: 'suffix',  type: 'land',     detect: 'ляндия' },
    { kind: 'suffix',  type: 'grad',     detect: 'град' },
    { kind: 'suffix',  type: 'siti',     detect: 'сити' },
    { kind: 'suffix',  type: 'ism',      detect: 'изм' }
  ],
  fi: [
    { kind: 'suffix',  type: 'tasavalta', detect: '-tasavalta' },
    { kind: 'suffix',  type: 'paiva',     detect: '-päivä' },
    { kind: 'suffix',  type: 'ismi',      detect: 'ismi' },
    { kind: 'suffix',  type: 'kyla',      detect: 'kylä' },
    { kind: 'suffix',  type: 'maa',       detect: 'maa' },
    { kind: 'suffix',  type: 'la',        detect: 'la' }
  ]
};

const RU_VOWELS = 'аеёиоуыэюя';
const RU_STRIPPABLE_END = /[аеёиоуыэюяйьъ]+$/i;
const RU_TRAILING_SOFT = /[ьйъ]+$/i;
const FI_BACK_VOWELS = /[aou]/i;
const FI_TRAILING_VOWEL = /[aeiouyäö]$/i;

// Scan a compiled question string for a word-modifier marker.
// Returns the matched rule or null.
export function detectWordModifier(rawQuestionStr, locale) {
  const rules = WORD_MODIFIERS[locale] || WORD_MODIFIERS.en;
  const sorted = [...rules].sort((a, b) => b.detect.length - a.detect.length);
  const lower = rawQuestionStr.toLowerCase();
  for (const rule of sorted) {
    if (rule.kind === 'suffix') {
      if (lower.includes('[ ... ]' + rule.detect.toLowerCase())) return rule;
    } else {
      if (lower.includes(rule.detect.toLowerCase() + '[ ... ]')) return rule;
    }
  }
  return null;
}

// Transform a player-entered (uppercase, nominative) word for a detected
// modifier. Returns { text, revealTail } where revealTail is the suffix
// to leave unmasked in the word card ("" for wrappers / unknown types).
export function applyWordModifier(word, modType, locale) {
  const joinTokens = w => w.split(/\s+/).filter(Boolean).join('-');
  const base = joinTokens(word);

  if (locale === 'ru') {
    const endsConsonant = stem => {
      const s = stem.replace(RU_TRAILING_SOFT, '');
      const last = s.slice(-1).toLowerCase();
      return last !== '' && !RU_VOWELS.includes(last);
    };
    switch (modType) {
      case 'ism': {
        const stem = base.replace(RU_STRIPPABLE_END, '');
        return { text: stem + 'ИЗМ', revealTail: 'ИЗМ' };
      }
      case 'land': {
        const stem = base.replace(RU_TRAILING_SOFT, '');
        const tail = endsConsonant(stem) ? 'ОЛЯНДИЯ' : 'ЛЯНДИЯ';
        return { text: stem + tail, revealTail: tail };
      }
      case 'grad': {
        const stem = base.replace(RU_TRAILING_SOFT, '');
        if (endsConsonant(stem)) return { text: stem + 'ОГРАД', revealTail: 'ОГРАД' };
        return { text: stem + '-ГРАД', revealTail: 'ГРАД' };
      }
      case 'siti':
        return { text: base + '-СИТИ', revealTail: 'СИТИ' };
      default:
        return { text: base, revealTail: '' };
    }
  }

  if (locale === 'fi') {
    switch (modType) {
      case 'ismi': {
        const stem = FI_TRAILING_VOWEL.test(base) ? base.slice(0, -1) : base;
        return { text: stem + 'ISMI', revealTail: 'ISMI' };
      }
      case 'maa':
        return { text: base + 'MAA', revealTail: 'MAA' };
      case 'la': {
        const tail = FI_BACK_VOWELS.test(base) ? 'LA' : 'LÄ';
        return { text: base + tail, revealTail: tail };
      }
      case 'kyla':
        return { text: base + 'KYLÄ', revealTail: 'KYLÄ' };
      case 'tasavalta':
        return { text: base + '-TASAVALTA', revealTail: 'TASAVALTA' };
      case 'paiva':
        return { text: base + '-PÄIVÄ', revealTail: 'PÄIVÄ' };
      default:
        return { text: base, revealTail: '' };
    }
  }

  // English (default)
  switch (modType) {
    case 'ism': {
      let stem = base;
      if (stem.endsWith('Y')) stem = stem.slice(0, -1);
      if (stem.endsWith('IST')) stem = stem.slice(0, -3);
      if (stem.endsWith('E')) stem = stem.slice(0, -1);
      return { text: stem + 'ISM', revealTail: 'ISM' };
    }
    case 'land':  return { text: base + 'LAND',  revealTail: 'LAND' };
    case 'ville': return { text: base + 'VILLE', revealTail: 'VILLE' };
    case 'field': return { text: base + 'FIELD', revealTail: 'FIELD' };
    default:      return { text: base, revealTail: '' };
  }
}

// Remove a suffix marker's literal text from a compiled template so the
// template renders as "[ ... ]" and the affix lives only inside the word.
export function stripSuffixMarker(rawQuestionStr, detect) {
  const re = new RegExp('\\[ \\.\\.\\. \\]' + escapeRegExp(detect), 'gi');
  return rawQuestionStr.replace(re, '[ ... ]');
}
