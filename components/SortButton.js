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
        <Text style={styles.arrows}>↑ </Text>
        <Text style={styles.line}>|</Text>
        <Text style={styles.arrows}> ↓</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 30,
    backgroundColor: Colors.secondary8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    //overflow: 'hidden',

    //iOS
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,

    // android
    elevation: 10,
  },

  textContainer: {
    //height: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrows: {
    fontFamily: 'poppins-800',
    fontSize: 28,
    lineHeight: 28,
    color: Colors.accent1,
    paddingVertical: 5,
  },

  line: {
    fontFamily: 'poppins-light',
    fontSize: 40,
    lineHeight: 40,
    color: Colors.accent1,
  },
});

export default SortButton;
