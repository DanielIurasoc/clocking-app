import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

import Colors from '../constants/Colors.js';
import commonStyles from './commonStyles.js';
//import LogoImg from '../Resources/logo_temp.png';

const HomeHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLogoContainer}>
        <Image
          source={require('../Resources/logo_temp.png')}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.accountContainer}>
        <Image
          source={require('../Resources/account_photo.jpg')}
          style={styles.accountImage}
        />
        <Text style={{ ...commonStyles.text, ...styles.welcomeText }}>
          {' '}
          Welcome, John M. Smithsenn{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',

    width: '100%',
    height: 270,
    backgroundColor: '#fff',
  },

  headerLogoContainer: {
    width: '100%',
    height: 180,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: Colors.primary5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width: 250,
    height: 100,
  },

  accountContainer: {
    alignItems: 'center',
    marginTop: -60,
  },

  accountImage: {
    width: 120,
    height: 120,

    borderRadius: 60,
    borderWidth: 1,
    borderColor: Colors.primary9,
  },

  welcomeText: {
    fontSize: 20,
    // paddingVertical: 10,
    //textAlign: 'center',
  },
});

export default HomeHeader;
