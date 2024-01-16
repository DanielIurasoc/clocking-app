import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import commonStyles from '../commonStyles';
import Colors from '../../constants/Colors';

const TimeCard = ({ color, label, content }) => {
  return (
    <View
      style={{
        ...styles.container,
        ...{
          borderColor:
            color === 'green'
              ? Colors.green5
              : color === 'yellow'
              ? Colors.accent3
              : Colors.primary4,
        },
      }}
    >
      <Text style={{ ...commonStyles.text, ...styles.label }}>{label}</Text>
      <Text style={{ ...commonStyles.text, ...styles.content }}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: '27%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 2.5,
    borderColor: Colors.green5,
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
