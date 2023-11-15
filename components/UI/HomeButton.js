import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import commonStyles from '../commonStyles';
import Colors from '../../constants/Colors';

const HomeButton = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.mainContainer, ...props.style }}
      onPress={props.onButtonPress}
    >
      <View style={styles.infoContainer}>
        <Text style={{ ...commonStyles.text, ...styles.labelText }}>
          {' '}
          {props.labelText}{' '}
        </Text>
        <Text style={{ ...commonStyles.text, ...styles.chosenText }}>
          {' '}
          {props.chosenText}{' '}
        </Text>
      </View>
      <MaterialCommunityIcon
        name={props.iconName}
        size={40}
        color={Colors.accent1}
        style={styles.infoIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '90%',
    height: 60,
    backgroundColor: Colors.primary5,
    borderRadius: 20,
    marginLeft: '5%',
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
