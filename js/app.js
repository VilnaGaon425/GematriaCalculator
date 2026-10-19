import { calculateGematria } from './gematria.js';
import { readHistory, writeHistory, readUserSettings, writeUserSettings } from './storage.js';
import { createAppState, DEFAULT_USER_SETTINGS } from './app-state.js';

export function createCalculatorApp(options = {}) {
  const state = createAppState();
  const settings = readUserSettings(DEFAULT_USER_SETTINGS);

  Object.assign(state.settings, settings);
  state.history = Array.isArray(readHistory()) ? readHistory() : [];

  return {
    state,
    getText() {
      return state.text;
    },
    setText(value) {
      state.text = String(value || '');
      return state.text;
    },
    toggleKatan() {
      state.katan = !state.katan;
      return state.katan;
    },
    calculateValue(text = state.text) {
      return calculateGematria(text, state.katan);
    },
    saveCurrentCalculation(text = state.text) {
      const value = this.calculateValue(text);
      const entry = { text, value };
      const nextHistory = [entry, ...state.history].slice(0, 50);
      state.history = nextHistory;
      writeHistory(nextHistory);
      return entry;
    },
    setSetting(name, value) {
      if (!Object.prototype.hasOwnProperty.call(state.settings, name)) {
        return false;
      }
      state.settings[name] = value;
      writeUserSettings(state.settings);
      return true;
    },
    getSetting(name, fallback = undefined) {
      return Object.prototype.hasOwnProperty.call(state.settings, name)
        ? state.settings[name]
        : fallback;
    },
    clearHistory() {
      state.history = [];
      writeHistory([]);
      return state.history;
    },
    ...options
  };
}

export function renderDisplay(target, { text, result }) {
  if (!target) return;
  const textEl = target.querySelector('#text');
  const resultEl = target.querySelector('#result');
  if (textEl) textEl.textContent = text || '';
  if (resultEl) resultEl.textContent = String(result ?? 0);
}

export default {
  createCalculatorApp,
  renderDisplay
};
