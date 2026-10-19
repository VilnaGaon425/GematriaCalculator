const STORAGE_PREFIX = "gematria";

export function getStorageKey(key) {
  return `${STORAGE_PREFIX}:${key}`;
}

export function readStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(getStorageKey(key));
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(getStorageKey(key));
    return true;
  } catch (error) {
    return false;
  }
}

export function readHistory() {
  return readStorage("history", []);
}

export function writeHistory(history) {
  return writeStorage("history", Array.isArray(history) ? history : []);
}

export function readUserSettings(defaults = {}) {
  return {
    ...defaults,
    ...readStorage("userSettings", {})
  };
}

export function writeUserSettings(settings) {
  return writeStorage("userSettings", settings || {});
}

export default {
  getStorageKey,
  readStorage,
  writeStorage,
  removeStorage,
  readHistory,
  writeHistory,
  readUserSettings,
  writeUserSettings
};
