/* eslint no-case-declarations: 0 */
import { combineReducers } from 'redux';

const overlays = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_OVERLAY':
      return {
        ...state,
        [action.id]: action.overlay,
      };
    case 'DELETE_OVERLAY':
      const { [action.id]: deleted, ...rest } = state;
      return rest;
    default:
      return state;
  }
};

const counts = (state = {}, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      const count = state[action.key] || 0;
      return {
        ...state,
        [action.key]: count + 1,
      };
    default:
      return state;
  }
};

const theme = (state = { color: 'darkblue' }, action) => {
  switch (action.type) {
    case 'CHANGE_THEME_COLOR':
      return {
        ...state,
        color: action.color,
      };
    default:
      return state;
  }
};

export default combineReducers({
  overlays,
  counts,
  theme,
});
