import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import commonStyles from '../commonStyles';
import Colors from '../../constants/Colors';

const HomeButton = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  const content = (
    <View style={styles.buttonContainer}>
      <View style={styles.infoContainer}>
        <Text style={{ ...commonStyles.text, ...styles.labelText }}>
          {props.labelText}
        </Text>
        <Text style={{ ...commonStyles.text, ...styles.chosenText }}>
          {props.chosenText}
        </Text>
      </View>
      <MaterialCommunityIcon
        name={props.iconName}
        size={40}
        color={Colors.primary1}
        style={styles.infoIcon}
      />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={{ ...styles.mainButton, ...props.style }}>
        <TouchableComponent
          onPress={props.onButtonPress}
          // background={TouchableNativeFeedback.Ripple(Colors.primary6, true)}
          // useForeground
        >
          {content}
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '95%',
    height: 75,
    paddingHorizontal: 10,
    paddingBottom: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  mainButton: {
    width: '100%',
    height: 60,
    backgroundColor: Colors.primary5,
    borderRadius: 20,
    elevation: 6,
    overflow: 'hidden',
  },

  buttonContainer: {
    width: '100%',
    height: 60,
    backgroundColor: Colors.primary5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
  },

  infoContainer: {
    justifyContent: 'center',
    width: '70',
    height: '100%',
    marginLeft: '5%',
  },

  labelText: {
    fontSize: 16,
    lineHeight: 20,
  },

  chosenText: {
    lineHeight: 25,
    fontSize: 20,
  },

  infoIcon: {
    marginRight: '5%',
  },
});

export default HomeButton;
