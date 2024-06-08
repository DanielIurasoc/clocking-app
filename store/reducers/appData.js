import {
  SET_ACTIVE_SCREEN,
  SET_NAVIGATION_FLOW,
  SET_CLOCKING_DATA,
  CLEAR_CLOCKING_DATA,
  TOGGLE_DARK_MODE,
} from '../actions/appData.js';

const initialState = {
  activeScreen: 'Home',
  navigationFlow: 'auth',

  // clocking temporary data
  locationId: '',
  date: ' - ',
  startTime: ' - ',
  endTime: ' - ',
  pauseTime: ' 00 : 00 ',

  // user preferences
  darkModeOn: false,
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
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkModeOn: action.payload,
      };
    case SET_CLOCKING_DATA:
      return {
        ...state,
        [action.payload.identifier]: action.payload.data,
      };
    case CLEAR_CLOCKING_DATA:
      return {
        ...state,
        locationId: '',
        date: ' - ',
        startTime: ' - ',
        endTime: ' - ',
        pauseTime: ' 00 : 00 ',
      };
    default:
      return state;
  }
};
