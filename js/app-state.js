export const DEFAULT_USER_SETTINGS = {
  buttonSound: false,
  buttonAnimation: false,
  smoothTransitions: false,
  calculatorScale: 100,
  calculatorTheme: "classic"
};

export function createAppState() {
  return {
    text: "",
    result: 0,
    katan: false,
    dictionaryMode: false,
    instructionsOpen: false,
    settingsMode: false,
    history: [],
    dictionaryMatches: [],
    settings: { ...DEFAULT_USER_SETTINGS }
  };
}

export default {
  DEFAULT_USER_SETTINGS,
  createAppState
};
