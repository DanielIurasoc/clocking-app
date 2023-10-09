const initialState = {
  activeScreen: 'Home',
};

const activeScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_SCREEN':
      return {
        ...state,
        activeScreen: action.payload,
      };
    default:
      return state;
  }
};

export default activeScreenReducer;
