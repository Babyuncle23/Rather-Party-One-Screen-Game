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
// Снимаем только ОДНУ флексию (-а/-я/-о/-е/-ы/-и/-й/-ь/-ъ) или -ия/-ие/-ий —
// жадный [гласные]+$ выедал корень (ЧАЙ->Ч, ЗМЕЯ->ЗМ, ПОПУГАЙ->ПОПУГ)
const RU_ISM_END = /(?:и[яей]|[аеёиоуыэюяйьъ])$/i;
const RU_NOUN_VOWEL_END = /[аяоеыи]$/i;
const RU_TRAILING_SOFT = /[ьъ]+$/i;
const FI_TRAILING_VOWEL = /[aeiouyäö]$/i;

// Гармония гласных финского суффикса определяется последним компонентом
// сложного слова (kirja-HYLLY -> -LÄ). Для слитных соединений сканируем
// с конца: a/o/u — задние, ä/ö/y — передние, e/i — нейтральные.
function fiBackVowelHarmony(word) {
  const lastPart = word.split('-').pop() || word;
  for (let i = lastPart.length - 1; i >= 0; i--) {
    const ch = lastPart[i].toLowerCase();
    if (ch === 'a' || ch === 'o' || ch === 'u') return true;
    if (ch === 'ä' || ch === 'ö' || ch === 'y') return false;
  }
  return false; // e/i-only слова идут с передними гласными
}

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
    // Словосложение: соединительная гласная О (Е после ж/ш/ч/щ/ц),
    // слова на -й берут Е (ЧАЙ->ЧАЕ-), флексия -а/-я/-о/-е/-ы/-и снимается
    const getRussianCompoundStem = raw => {
      if (/й$/i.test(raw)) {
        return { stem: raw.slice(0, -1), conn: 'Е' };
      }
      const stripped = raw.replace(RU_TRAILING_SOFT, '').replace(RU_NOUN_VOWEL_END, '');
      if (endsConsonant(stripped)) {
        const conn = /[жшчщц]$/i.test(stripped) ? 'Е' : 'О';
        return { stem: stripped, conn };
      }
      return { stem: raw, conn: '' };
    };

    switch (modType) {
      case 'ism': {
        const stem = base.length > 3 ? base.replace(RU_ISM_END, '') : base.replace(/[йьъ]$/i, '');
        return { text: stem + 'ИЗМ', revealTail: 'ИЗМ' };
      }
      case 'land': {
        const { stem, conn } = getRussianCompoundStem(base);
        const tail = conn + 'ЛЯНДИЯ';
        return { text: stem + tail, revealTail: tail };
      }
      case 'grad': {
        const { stem, conn } = getRussianCompoundStem(base);
        if (conn) {
          const tail = conn + 'ГРАД';
          return { text: stem + tail, revealTail: tail };
        }
        return { text: base + '-ГРАД', revealTail: 'ГРАД' };
      }
      case 'siti':
        return { text: base + '-СИТИ', revealTail: 'СИТИ' };
      default:
        return { text: base, revealTail: '' };
    }
  }

  if (locale === 'fi') {
    const hasBackVowel = fiBackVowelHarmony(base);

    switch (modType) {
      case 'ismi': {
        // Основы на -nen переходят в -s- (IHMINEN -> IHMISISMI)
        if (/nen$/i.test(base)) {
          return { text: base.slice(0, -3) + 'SISMI', revealTail: 'ISMI' };
        }
        // Не отрезаем гласную у односложных с долгой гласной (TEE -> TEEISMI)
        const isLongMonosyllable = base.length <= 3 && /([aeiouyäö])\1$/i.test(base);
        const stem = (!isLongMonosyllable && FI_TRAILING_VOWEL.test(base)) ? base.slice(0, -1) : base;
        return { text: stem + 'ISMI', revealTail: 'ISMI' };
      }
      case 'maa':
        return { text: base + 'MAA', revealTail: 'MAA' };
      case 'la': {
        const tail = hasBackVowel ? 'LA' : 'LÄ';
        if (/nen$/i.test(base)) {
          return { text: base.slice(0, -3) + 'S' + tail, revealTail: tail };
        }
        // Основы на согласную присоединяются через дефис (KOIRAT-LA)
        const sep = FI_TRAILING_VOWEL.test(base) ? '' : '-';
        return { text: base + sep + tail, revealTail: tail };
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
