import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors.js';
import commonStyles from '../commonStyles.js';

const CommonHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLogoContainer}>
        {/* <TouchableOpacity
          onPress={props.onButtonPress}
          style={styles.drawerButton}
        >
          <MaterialCommunityIcon name="menu" size={30} color={Colors.dark5} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.accountContainer}>
        <TouchableOpacity onPress={props.onButtonPress}>
          <Image
            source={require('../../Resources/account_photo.jpg')}
            style={styles.accountImage}
          />
        </TouchableOpacity>
        <Text
          style={{ ...commonStyles.text, ...styles.accountNameText }}
          numberOfLines={1}
        >
          John M. Smithsen nnnnnnnnnnn
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',

    width: '100%',
    height: 110,
    backgroundColor: '#fff',
  },

  headerLogoContainer: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary5,
  },

  drawerButton: {
    alignSelf: 'flex-start',
    paddingTop: 32,
    paddingLeft: 20,
    marginLeft: '0%',
  },

  accountContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -50,
  },

  accountImage: {
    width: 65,
    height: 65,
    marginLeft: '0%',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: Colors.primary9,
  },

  accountNameText: {
    paddingLeft: 10,
    fontSize: 20,
    width: Dimensions.get('window').width * 0.7,
  },
});

export default CommonHeader;
