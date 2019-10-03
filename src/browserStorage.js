export const loadState = (storage = localStorage) => {
  try {
    const string = storage.getItem('state');
    if (string === null) return undefined;
    return JSON.parse(string) || undefined;
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state, storage = localStorage) => {
  try {
    const string = JSON.stringify(state);
    storage.setItem('state', string);
  } catch (e) {
    // ignore
  }
};
