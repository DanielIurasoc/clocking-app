import AsyncStorage from '@react-native-async-storage/async-storage';
import * as appDataActions from './appData.js';

export const SIGNUP = 'SIGNUP';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

const KEY = 'AIzaSyBby14_axMzqWaY9BCTuBbpkA5aMO4WJH0';
let timer;

export const signup = (fullname, phone, email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //fullname,
          //phone,
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();

      let message;

      switch (errorResponseData.error.message) {
        case 'EMAIL-EXISTS':
          message = 'The entered email address is already used by an account';
          break;
        case 'OPERATION_NOT_ALLOWED':
          message = 'Signing in is temporarely disabled. Try again later';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          message = 'Too many attemts. Try again later';
          break;
        default:
          message = 'Something went wrong!';
      }

      throw new Error(message);
    }

    //const responseData = await response.json();

    dispatch({
      type: SIGNUP,
    });
  };
};

export const authenticate = (userId, userToken, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId,
      userToken,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();

      let message;
      switch (errorResponseData.error.message) {
        case 'INVALID_EMAIL':
          message = 'Incorrect email address entered';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          message = 'Incorrect email or password entered';
          break;
        case 'MISSING_PASSWORD':
          message = 'Please enter a password';
          break;
        case 'USER_DISABLED':
          message = 'The account has been disabled';
          break;
        default:
          message = 'Something went wrong!';
      }

      throw new Error(message);
    }

    const responseData = await response.json();

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');

  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(appDataActions.setNavigationFlow('auth'));
      dispatch(appDataActions.clearClockingData());
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = async (userToken, userId, expirationDate) => {
  try {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        userToken,
        userId,
        expiryDate: expirationDate.toISOString(),
      })
    );
  } catch (e) {
    console.log(e.message);
  }
};
