import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import * as appDataActions from './appData.js';

export const SIGNUP = 'SIGNUP';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

const KEY = 'AIzaSyBby14_axMzqWaY9BCTuBbpkA5aMO4WJH0';
let timer;

export const signup = (fullname, phone, email, password) => {
  return async (dispatch) => {
    let userCredentials = null;

    try {
      userCredentials = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      console.log('User created and logged in!');

      if (userCredentials.user) {
        // add user to realtime database too
        writeDataToDatabase(
          userCredentials.user.uid,
          fullname,
          fullname,
          'EmpID0001',
          email,
          phone
        );

        dispatch({
          type: SIGNUP,
        });
      }
    } catch (error) {
      let message;

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'The entered email address is already used by an account';
          break;
        case 'auth/invalid-email':
          message = 'The entered email address is not valid';
          break;
        case 'auth/operation-not-allowed':
          message = 'The registration functionality is disabled temporarily';
          break;
        case 'auth/weak-password':
          message = 'The entered password is not strong enough';
          break;
        default:
          message = 'Something went wrong!';
      }

      throw new Error(message);
    }
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
  return async () => {
    let userCredentials = null;

    try {
      userCredentials = await auth().signInWithEmailAndPassword(
        email,
        password
      );

      console.log('User signed in');

      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

      if (userCredentials.user) {
        saveDataToStorage(
          userCredentials.user,
          userCredentials.user.uid,
          expirationDate
        );

        dispatch({
          type: AUTHENTICATE,
          userId: userCredentials.user.uid,
          userToken: userCredentials.user,
        });
      }
    } catch (error) {
      console.error(error);
      let message;

      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Incorrect email address entered';
          break;
        case 'auth/user-not-found':
          message = 'There is no account corresponding to this email';
          break;
        case 'auth/invalid-credential':
          message = 'Incorrect password or email entered';
          break;
        case 'auth/user-disabled':
          message = 'This account has been disabled';
          break;
        default:
          message = 'Something went wrong!';
      }

      throw new Error(message);
    }
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');

  auth()
    .signOut()
    .then(() => console.log('User signed out'));

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

const writeDataToDatabase = (
  userId,
  firstName,
  lastName,
  employerId,
  email,
  phone
) => {
  // get reference to realtime database desired location for writing data
  const reference = database().ref(`/users/${userId}`);

  // write data
  reference.set({
    firstName,
    lastName,
    employerId,
    email,
    phone,
    preferences: {
      language: 'English',
    },
  });
};
