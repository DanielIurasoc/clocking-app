import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import CustomText from './CustomText.js';
import Colors from '../constants/Colors.js';

const ClockingItem = (props) => {
  return (
    <View style={styles.entryCard}>
      <TouchableOpacity style={styles.button} onPress={props.onCardPress}>
        <Text style={styles.index}> #{props.index + 1} </Text>
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  entryCard: {
    height: 50,
    width: '90%',

    //iOS
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,

    // android
    elevation: 10,

    borderRadius: 30,
    backgroundColor: Colors.secondary,
    marginHorizontal: 20,
    marginTop: 20,
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  index: {
    fontFamily: 'antipasto-bold',
    fontSize: 30,
    color: Colors.primary,
  },

  title: {
    fontFamily: 'antipasto-regular',
    fontSize: 30,
    color: Colors.primary,
    width: 280,
  },
});

export default ClockingItem;
