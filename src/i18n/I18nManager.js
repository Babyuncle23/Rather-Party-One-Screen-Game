// =====================================================================
// I18nManager — единая точка локализации (Sprint 4).
//  setLocale('en'|'ru'|'fi')  — переключить язык (+persist, +DOM)
//  t(key, params)            — строка из словаря, dot-path, {param}
//  applyStaticTexts(root)    — перевести элементы [data-i18n]
//  getQuestionsDB()          — questionsDatabase текущей локали
//  emojiNameFor(emoji)       — локализованное имя эмодзи для TTS
// =====================================================================

import { questionsDatabase as DB_EN } from '../data/questions.js';
import { questionsDatabase as DB_RU } from './questions.ru.js';
import { questionsDatabase as DB_FI } from './questions.fi.js';
import { UI_EN } from './ui.en.js';
import { UI_RU } from './ui.ru.js';
import { UI_FI } from './ui.fi.js';

export const SUPPORTED_LOCALES = ['en', 'ru', 'fi'];
export const LOCALE_LABELS = { en: 'EN', ru: 'RU', fi: 'FI' };

const DBS = { en: DB_EN, ru: DB_RU, fi: DB_FI };
const UIS = { en: UI_EN, ru: UI_RU, fi: UI_FI };
const LS_KEY = 'rp.locale';

let currentLocale = 'en';
try {
  const saved = (typeof localStorage !== 'undefined') ? localStorage.getItem(LS_KEY) : null;
  if (saved && SUPPORTED_LOCALES.includes(saved)) currentLocale = saved;
} catch (e) { /* private mode */ }

export function getLocale() {
  return currentLocale;
}

export function setLocale(locale) {
  currentLocale = SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(LS_KEY, currentLocale);
  } catch (e) { /* private mode */ }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = currentLocale;
    applyStaticTexts();
  }
}

export function getQuestionsDB() {
  return DBS[currentLocale] || DBS.en;
}

// dot-path lookup: 'guesser.oralBtn' -> UI[locale].guesser.oralBtn
// Falls back to EN, then to the raw key. {param} interpolation.
export function t(key, params) {
  const lookup = (dict, k) => k.split('.').reduce((o, part) => (o && o[part] !== undefined ? o[part] : undefined), dict);
  let value = lookup(UIS[currentLocale] || UI_EN, key);
  if (value === undefined) value = lookup(UI_EN, key);
  if (value === undefined) return key;
  if (Array.isArray(value) || typeof value !== 'string') return value;
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (m, name) => (params[name] !== undefined ? String(params[name]) : m));
}

// Переводит статический DOM: [data-i18n] -> textContent,
// [data-i18n-html] -> innerHTML, [data-i18n-placeholder] -> placeholder,
// [data-i18n-title] -> title, [data-i18n-aria] -> aria-label,
// [data-i18n-alt] -> alt.
export function applyStaticTexts(root) {
  if (typeof document === 'undefined') return;
  const scope = root || document;
  scope.querySelectorAll('[data-i18n]').forEach(el => {
    let params;
    const rawParams = el.getAttribute('data-i18n-params');
    if (rawParams) { try { params = JSON.parse(rawParams); } catch (e) { params = undefined; } }
    const v = t(el.getAttribute('data-i18n'), params);
    if (typeof v === 'string') {
      el.textContent = v;
      // Контурный слой animated-text-outline рисуется из data-text —
      // без синхронизации поверх перевода остаётся английский «призрак»
      if (el.hasAttribute('data-text')) el.setAttribute('data-text', v);
    }
  });
  scope.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t(el.getAttribute('data-i18n-html'));
    if (typeof v === 'string') el.innerHTML = v;
  });
  scope.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = t(el.getAttribute('data-i18n-placeholder'));
    if (typeof v === 'string') el.setAttribute('placeholder', v);
  });
  scope.querySelectorAll('[data-i18n-title]').forEach(el => {
    const v = t(el.getAttribute('data-i18n-title'));
    if (typeof v === 'string') el.setAttribute('title', v);
  });
  scope.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const v = t(el.getAttribute('data-i18n-aria'));
    if (typeof v === 'string') el.setAttribute('aria-label', v);
  });
  scope.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const v = t(el.getAttribute('data-i18n-alt'));
    if (typeof v === 'string') el.setAttribute('alt', v);
  });
}

// Локализованное имя эмодзи («Лиса» / «Kettu» / «Fox») для TTS и title-тултипов.
export function emojiNameFor(emoji) {
  const dict = (UIS[currentLocale] || UI_EN).emojiNames || UI_EN.emojiNames;
  return dict[emoji] || UI_EN.emojiNames[emoji] || '';
}
