import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as appDataActions from '../../store/actions/appData.js';

import commonStyles from '../../components/commonStyles.js';
import Colors from '../../constants/Colors.js';
import StandardButton from '../../components/Auth/AuthButton.js';
import SocialLink from '../../components/Auth/SocialLink.js';
import AuthInput from '../../components/Auth/AuthInput.js';

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const loginHandler = () => {
    // dispatch login action

    // change the app flow if the login is successful
    dispatch(appDataActions.setNavigationFlow('user'));
  };

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
            {/* email input */}
            <AuthInput style={styles.email} label="email" />
            {/* password input */}
            <AuthInput style={styles.password} label="password" />
            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
              <Text
                style={{ ...commonStyles.text, ...styles.forgotButtonText }}
              >
                forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <StandardButton
            style={styles.loginButton}
            title1="Log in"
            onPress={loginHandler}
          />
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
