import { SIGNUP, LOGOUT, AUTHENTICATE } from '../actions/auth.js';

const initialState = {
  userId: null,
  userToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return state;
    case AUTHENTICATE:
      return {
        userId: action.userId,
        userToken: action.userToken,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
