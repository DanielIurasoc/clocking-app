import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { useDispatch } from 'react-redux';

import * as appDataActions from '../../store/actions/appData.js';

import commonStyles from '../../components/commonStyles.js';
import Colors from '../../constants/Colors.js';
import StandardButton from '../../components/Auth/AuthButton.js';
import SocialLink from '../../components/Auth/SocialLink.js';
import AuthInput from '../../components/Auth/AuthInput.js';

const RegisterScreen = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useDispatch();

  const registerHandler = () => {
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
          <View style={styles.group1}>
            <Text style={{ ...commonStyles.text, ...styles.loginTitle }}>
              New around here?
            </Text>
            <Text style={{ ...commonStyles.text, ...styles.loginTitle }}>
              Let's get you set up.
            </Text>
          </View>
          <View style={styles.group2}>
            {/* email input */}
            <AuthInput style={styles.label} label="Full Name" />
            {/* password input */}
            <AuthInput style={styles.label} label="Phone Number" />
            <AuthInput style={styles.label} label="Email" />
            <AuthInput style={styles.label} label="Password" />
            <AuthInput style={styles.label} label="Confirm Password" />
            <View style={styles.tocContainer}>
              <CheckBox
                value={isSelected}
                disabled={false}
                onValueChange={(value) => setIsSelected(value)}
              />
              <Text style={styles.tocLabel}>
                I've read and fully agree with the Terms and Conditions of
                Clocko.
              </Text>
            </View>
          </View>
          <View style={styles.group3}>
            <StandardButton
              style={styles.loginButton}
              title1="Sign up"
              onPress={registerHandler}
            />
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
