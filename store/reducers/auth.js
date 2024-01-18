import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  AUTHENTICATE,
  UPDATE_ID,
} from '../actions/auth.js';

const initialState = {
  userId: null,
  userToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return state;
    case LOGIN:
      return {
        userId: action.userId,
        userToken: action.userToken,
      };
    case AUTHENTICATE:
      return {
        userId: action.userId,
        userToken: action.userToken,
      };
    case UPDATE_ID:
      return {
        ...state,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
