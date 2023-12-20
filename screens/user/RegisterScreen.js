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
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { useDispatch } from 'react-redux';

import * as appDataActions from '../../store/actions/appData.js';
import * as authActions from '../../store/actions/auth.js';

import commonStyles from '../../components/commonStyles.js';
import Colors from '../../constants/Colors.js';
import StandardButton from '../../components/Auth/AuthButton.js';
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

const RegisterScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorOccured, setErrorOccured] = useState(undefined);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fullname: '',
      phone: '',
      email: '',
      password: '',
      confirm: '',
      toc: false,
    },
    inputValidities: {
      fullname: false,
      phone: false,
      email: false,
      password: false,
      confirm: false,
      toc: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (errorOccured) {
      Alert.alert('An error occured', errorOccured, [{ text: 'Ok' }]);
    }
  }, [errorOccured]);

  const registerHandler = async () => {
    setErrorOccured(null);
    setIsLoading(true);

    // dispatch register action
    try {
      await dispatch(
        authActions.signup(
          formState.inputValues.fullname,
          formState.inputValues.phone,
          formState.inputValues.email,
          formState.inputValues.password
        )
      );

      // go to the login page if successful
      props.navigation.navigate('Login');
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
          <View style={styles.group1}>
            <Text style={{ ...commonStyles.text, ...styles.loginTitle }}>
              New around here?
            </Text>
            <Text style={{ ...commonStyles.text, ...styles.loginTitle }}>
              Let's get you set up.
            </Text>
          </View>
          <View style={styles.group2}>
            <AuthInput
              id="fullname"
              // validities
              required
              minLength={6}
              // customizations
              placeholder="full name"
              autoCapitalize="none"
              keyboardType="default"
              initialValue=""
              errorMessage="enter your full name"
              // actions
              onInputChange={inputChangeHandler}
            />
            <AuthInput
              id="phone"
              // validities
              required
              minLength={8}
              // customizations
              placeholder="phone number"
              autoCapitalize="none"
              keyboardType="phone-pad"
              initialValue=""
              errorMessage="enter your phone number"
              // actions
              onInputChange={inputChangeHandler}
            />

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
            <AuthInput
              id="confirm"
              // validities
              required
              minLength={8}
              // customizations
              placeholder="confirm password"
              secureTextEntry
              autoCapitalize="none"
              keyboardType="default"
              initialValue=""
              errorMessage="enter a stronger password"
              // actions
              onInputChange={inputChangeHandler}
            />
            <View style={styles.tocContainer}>
              <CheckBox
                value={formState.inputValues.toc}
                disabled={false}
                onValueChange={(newValue) => {
                  let validity = false;
                  if (newValue) {
                    validity = true;
                  }
                  inputChangeHandler('toc', newValue, validity);
                }}
              />
              <Text style={styles.tocLabel}>
                I've read and fully agree with the Terms and Conditions of
                Clocko.
              </Text>
            </View>
          </View>
          <View style={styles.group3}>
            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.primary5} />
            ) : (
              <StandardButton
                style={styles.loginButton}
                title1="Sign up"
                onPress={registerHandler}
              />
            )}

            <View style={styles.signInContent}>
              <Text style={styles.noAccountText}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Login');
                }}
              >
                <Text style={styles.signInText}> Log in</Text>
              </TouchableOpacity>
            </View>
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
    flex: 0.9,
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
  },

  group1: {
    width: '100%',
    justifyContent: 'flex-start',
  },

  group2: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },

  group3: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40,
  },

  label: {
    marginTop: 15,
  },

  tocContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  tocCheckbox: {},

  tocLabel: {
    marginLeft: 10,
    paddingTop: 10,
    fontFamily: 'poppins-light',
    fontSize: 14,
  },

  loginButton: {
    width: '60%',
  },

  signInContent: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  noAccountText: {},

  signInText: {
    fontFamily: 'poppins-medium',
    color: Colors.primary5,
  },
});

export default RegisterScreen;
