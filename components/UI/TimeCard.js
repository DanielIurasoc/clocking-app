import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import commonStyles from '../commonStyles';

import { ThemeContext } from './ThemeContext';
import Colors from '../../constants/Colors';

const TimeCard = ({ color, label, content }) => {
  // color context
  const { theme } = useContext(ThemeContext);
  const styles = myStyles(theme);

  return (
    <View
      style={{
        ...styles.container,
        ...{
          borderColor:
            color === 'green'
              ? theme.green5
              : color === 'yellow'
              ? theme.accent3
              : theme.primary4,
        },
      }}
    >
      <Text style={{ ...commonStyles.text, ...styles.label }}>{label}</Text>
      <Text style={{ ...commonStyles.text, ...styles.content }}>{content}</Text>
    </View>
  );
};

const myStylestyles = (theme) =>
  StyleSheet.create({
    container: {
      minWidth: '27%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      borderWidth: 2.5,
      borderColor: theme.green5,
      borderRadius: 20,
    },

    label: {
      fontSize: 16,
    },

    content: {
      fontFamily: 'poppins-medium',
      fontSize: 20,
    },
  });

export default TimeCard;
