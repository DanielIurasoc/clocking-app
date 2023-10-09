import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import commonStyles from './commonStyles.js';
import Colors from '../constants/Colors.js';

const DrawerButton = ({ iconName, title, isActive, style }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...style }}
      disabled={!isActive}
    >
      <MaterialIcon
        name={iconName}
        size={25}
        style={{
          color: Colors.primary5,
        }}
      />

      <Text style={{ ...commonStyles.text, ...styles.title }} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 40,
    height: 'auto',
    width: 180,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
  },

  image: {},

  title: {
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: Colors.dark4,
    marginLeft: 10,
    paddingTop: 3,
  },
});

export default DrawerButton;
