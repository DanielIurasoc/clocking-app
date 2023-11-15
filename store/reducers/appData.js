import { SET_ACTIVE_SCREEN, SET_NAVIGATION_FLOW } from '../actions/appData.js';

const initialState = {
  activeScreen: 'Home',
  navigationFlow: 'auth',

  // to be added
  // dark mode enabled
  // etc
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_SCREEN:
      return {
        ...state,
        activeScreen: action.payload,
      };
    case SET_NAVIGATION_FLOW:
      return {
        ...state,
        navigationFlow: action.payload,
      };
    default:
      return state;
  }
};
