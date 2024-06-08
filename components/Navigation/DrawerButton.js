import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import commonStyles from '../commonStyles.js';

import { ThemeContext } from '../UI/ThemeContext.js';
import Colors from '../../constants/Colors.js';

const DrawerButton = ({ iconName, title, isActive, onPress, style }) => {
  // color context
  const { theme } = useContext(ThemeContext);
  const styles = myStyles(theme);

  return (
    <TouchableOpacity
      style={{ ...styles.button, ...style }}
      disabled={!isActive}
      onPress={onPress}
    >
      <MaterialIcon
        name={iconName}
        size={25}
        style={{
          color: theme.primary5,
        }}
      />

      <Text style={{ ...commonStyles.text, ...styles.title }} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const myStyles = (theme) =>
  StyleSheet.create({
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
      color: theme.dark4,
      marginLeft: 10,
      paddingTop: 3,
    },
  });

export default DrawerButton;
