import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

import * as authActions from '../../store/actions/auth.js';
import * as appDataActions from '../../store/actions/appData.js';

import commonStyles from '../../components/commonStyles.js';
import Colors from '../../constants/Colors.js';
import StandardButton from '../../components/Auth/AuthButton.js';
import SocialLink from '../../components/Auth/SocialLink.js';
import AuthInput from '../../components/Auth/AuthInput.js';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }

      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
      };
    default:
      return state;
  }
};

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorOccured, setErrorOccured] = useState(undefined);
  const userId = useSelector((state) => state.auth.userId);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (errorOccured) {
      Alert.alert('An error occured', errorOccured, [{ text: 'Ok' }]);
    }
  }, [errorOccured]);

  // const writeToAsyncStorage = async (key, value) => {
  //   await AsyncStorage.setItem(key, JSON.stringify(value));
  // };

  // const getDataFromFirebase = () => {
  //   // reference to the database slice the user needs
  //   const userDataReference = database().ref(`/users/${userId}/`);
  //   const clockingsReference = database().ref(`/clockings/${userId}/`);
  //   const locationsReference = database().ref(`/locations/`);

  //   userDataReference.once('value').then((snapshot) => {
  //     writeToAsyncStorage('userAppData', snapshot.val());
  //   });

  //   clockingsReference.once('value').then((snapshot) => {
  //     const convertedClockingsArray = Object.keys(snapshot.val()).map(
  //       (clockingId) => ({
  //         clockingId,
  //         clockingData: snapshot.val()[clockingId],
  //       })
  //     );

  //     writeToAsyncStorage('userClockings', convertedClockingsArray); //snapshot.val());
  //   });

  //   locationsReference.once('value').then((snapshot) => {
  //     writeToAsyncStorage('locations', snapshot.val());
  //   });
  // };

  // useEffect(() => {
  //   if (userId !== null) {
  //     getDataFromFirebase();
  //   }
  // }, [userId]);

  const loginHandler = async () => {
    setErrorOccured(null);
    setIsLoading(true);

    // dispatch login action
    try {
      await dispatch(
        authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );

      // change the app flow if the login is successful
      dispatch(appDataActions.setNavigationFlow('user'));
    } catch (error) {
      setErrorOccured(error.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../Resources/gradient_image.png')}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.backButtonText}> {'<'} </Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={{ ...commonStyles.text, ...styles.loginTitle }}>
            Welcome back!
          </Text>
          <View style={styles.group}>
            <AuthInput
              id="email"
              // validities
              required
              email
              // customizations
              placeholder="e-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              initialValue=""
              errorMessage="enter a valid email address"
              // actions
              onInputChange={inputChangeHandler}
            />
            <AuthInput
              id="password"
              // validities
              required
              minLength={8}
              // customizations
              placeholder="password"
              secureTextEntry
              autoCapitalize="none"
              keyboardType="default"
              initialValue=""
              errorMessage="enter a stronger password"
              // actions
              onInputChange={inputChangeHandler}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
              <Text
                style={{ ...commonStyles.text, ...styles.forgotButtonText }}
              >
                forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.group2}>
            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.primary5} />
            ) : (
              <StandardButton
                style={styles.loginButton}
                title1="Log in"
                onPress={loginHandler}
              />
            )}
          </View>
          <View style={styles.signInContent}>
            <Text style={styles.noAccountText}>No account?</Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Register');
              }}
            >
              <Text style={styles.signInText}> Sign in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.socials}>
            <SocialLink label="G" />
            <SocialLink label="f" />
            <SocialLink label="I" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    height: Dimensions.get('screen').height,
    paddingTop: StatusBar.currentHeight,

    justifyContent: 'space-between',
  },

  backButton: {
    paddingLeft: StatusBar.currentHeight / 4,
  },

  backButtonText: {
    fontFamily: 'poppins-medium',
    fontSize: 36,
  },

  loginContainer: {
    flex: 0.8,
    justifyContent: 'space-evenly',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    alignItems: 'center',
    backgroundColor: Colors.secondary1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  loginTitle: {
    fontFamily: 'poppins-medium',
    fontSize: 24,
    alignSelf: 'flex-start',
  },

  group: {
    width: '100%',
  },

  group2: {
    width: '100%',
    alignItems: 'center',
  },

  email: {
    marginTop: 15,
  },

  password: {
    marginTop: 15,
  },

  forgotButton: {
    alignSelf: 'flex-end',
  },

  forgotButtonText: {
    fontFamily: 'poppins-light',
    fontSize: 14,
    color: Colors.primary5,
  },

  loginButton: {
    width: '60%',
  },

  signInContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -15,
  },

  noAccountText: {},

  signInText: {
    fontFamily: 'poppins-medium',
    color: Colors.primary5,
  },

  socials: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default LoginScreen;
