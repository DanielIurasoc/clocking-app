import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Colors from '../../constants/Colors.js';
import commonStyles from '../commonStyles.js';

const HomeHeader = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLogoContainer}>
        <Image
          source={require('../../Resources/logo_temp.png')}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.accountContainer}>
        <TouchableComponent onPress={props.onButtonPress} useForeground>
          <View style={styles.accountImageContainer}>
            <Image
              source={require('../../Resources/account_photo.jpg')}
              style={styles.accountImage}
            />
          </View>
        </TouchableComponent>
        {props.title && (
          <Text style={{ ...commonStyles.text, ...styles.welcomeText }}>
            {props.title}
          </Text>
        )}
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
    justifyContent: 'center',
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
    //marginRight: '20%',
    resizeMode: 'stretch',
  },

  accountContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -60,
  },

  accountImageContainer: {
    width: 120,
    height: 120,

    borderRadius: 60,
    borderWidth: 1,
    borderColor: Colors.primary9,
    overflow: 'hidden',
  },

  accountImage: {
    width: 120,
    height: 120,
  },

  welcomeText: {
    fontSize: 20,
    // paddingVertical: 10,
    //textAlign: 'center',
  },
});

export default HomeHeader;
