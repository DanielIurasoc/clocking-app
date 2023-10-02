import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const SortButton = (props) => {
  return (
    <TouchableOpacity
      style={[props.style, styles.button]}
      onPress={props.onSortPress}
    >
      <View style={styles.textContainer}>
        <Text style={styles.arrows}> ↑ </Text>
        <Text style={styles.line}>|</Text>
        <Text style={styles.arrows}> ↓ </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 30,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',

    //iOS
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,

    // android
    elevation: 10,
  },

  textContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrows: {
    fontFamily: 'antipasto-light',
    fontSize: 35,
    lineHeight: 35,
    color: Colors.secondary,
  },

  line: {
    fontFamily: 'antipasto-light',
    fontSize: 40,
    lineHeight: 40,
    color: Colors.secondary,
    marginTop: -5,
  },
});

export default SortButton;
