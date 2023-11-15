export const SET_ACTIVE_SCREEN = 'SET_ACTIVE_SCREEN';
export const SET_NAVIGATION_FLOW = 'SET_NAVIGATION_FLOW';

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
