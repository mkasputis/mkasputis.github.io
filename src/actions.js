export const addOverlay = (id, overlay) => ({
  type: 'ADD_OVERLAY',
  id,
  overlay,
});

export const deleteOverlay = (id) => ({
  type: 'DELETE_OVERLAY',
  id,
});

export const incrementCount = (key) => ({
  type: 'INCREMENT_COUNT',
  key,
});

export const changeThemeColor = (color) => ({
  type: 'CHANGE_THEME_COLOR',
  color,
});
