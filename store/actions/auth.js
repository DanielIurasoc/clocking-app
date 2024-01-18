import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import * as appDataActions from './appData.js';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const UPDATE_ID = 'UPDATE_ID';

const KEY = 'clocko_api_key';
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

export const authenticate = (userId, userToken) => {
  //, expiryTime) => {
  return async (dispatch) => {
    //dispatch(setLogoutTimer(expiryTime));
    let userCredentials = null;

    try {
      const credential = auth.EmailAuthProvider.credential(
        'test@test.com',
        'testtest'
        //userToken
      );
      console.log('Created Credential: ', credential);
      userCredentials = await auth().signInWithCredential(credential);

      if (userCredentials) {
        dispatch({
          type: AUTHENTICATE,
          userId,
          userToken,
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

export const login = (email, password) => {
  return async (dispatch) => {
    let userCredentials = null;

    try {
      userCredentials = await auth().signInWithEmailAndPassword(
        email,
        password
      );

      console.log('User signed in');

      // set an expiration time in 1 hour
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

      if (userCredentials.user) {
        const userToken = await userCredentials.user.getIdToken();

        saveDataToStorage(
          userCredentials.user.uid,
          userToken
          //expirationDate
        );

        dispatch({
          type: LOGIN,
          userId: userCredentials.user.uid,
          userToken,
          //expirationDate
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

export const updateId = (userId) => {
  return {
    type: UPDATE_ID,
    userId,
  };
};

export const logout = () => {
  //clearLogoutTimer();
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
    }, new Date(expirationTime).getTime());
  };
};

const saveDataToStorage = async (userId, userToken) => {
  //, expirationDate) => {
  try {
    AsyncStorage.setItem(
      'userLoginData',
      JSON.stringify({
        userToken,
        userId,
        //expiryDate: expirationDate.toISOString(),
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
