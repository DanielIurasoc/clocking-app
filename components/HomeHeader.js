import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors.js';
import commonStyles from './commonStyles.js';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLogoContainer}>
        <TouchableOpacity
          onPress={props.onButtonPress}
          style={styles.drawerButton}
        >
          <MaterialCommunityIcon name="menu" size={30} color={Colors.dark5} />
        </TouchableOpacity>
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
          Welcome, John M. Smithsenn
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  drawerButton: {
    alignSelf: 'flex-start',
    paddingTop: 32,
    paddingLeft: 20,
    marginLeft: '0%',
  },

  logoImage: {
    width: Dimensions.get('window').width * 0.6,
    maxHeight: 100,
    //height: '100%',
    marginRight: '20%',
    resizeMode: 'stretch',
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
