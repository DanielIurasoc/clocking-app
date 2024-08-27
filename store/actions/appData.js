export const SET_ACTIVE_SCREEN = 'SET_ACTIVE_SCREEN';
export const SET_NAVIGATION_FLOW = 'SET_NAVIGATION_FLOW';
export const SET_CLOCKING_DATA = 'SET_CLOCKING_DATA';
export const CLEAR_CLOCKING_DATA = 'CLEAR_CLOCKING_DATA';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

export const setActiveScreen = (screen) => {
  return {
    type: SET_ACTIVE_SCREEN,
    payload: screen,
  };
};

export const setNavigationFlow = (navFlow) => {
  return {
    type: SET_NAVIGATION_FLOW,
    payload: navFlow,
  };
};

export const setClockingData = (identifier, data) => {
  return {
    type: SET_CLOCKING_DATA,
    payload: {
      identifier,
      data,
    },
  };
};

export const clearClockingData = () => {
  return {
    type: CLEAR_CLOCKING_DATA,
  };
};

export const toggleDarkMode = (darkModeOn) => {
  return {
    type: TOGGLE_DARK_MODE,
    payload: darkModeOn,
  };
};
