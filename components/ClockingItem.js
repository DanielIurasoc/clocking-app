import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import commonStyles from './commonStyles.js';
import Colors from '../constants/Colors.js';

const ClockingItem = (props) => {
  const { date, title, startTime, endTime } = props.clockingData;

  return (
    <View style={styles.entryCard}>
      <TouchableOpacity style={styles.button} onPress={props.onCardPress}>
        <Text style={styles.index}> #{props.index + 1} </Text>
        <View style={styles.content}>
          {/* <Text
            style={{ ...commonStyles.text, ...styles.location }}
            numberOfLines={1}
          >
            {props.location}
          </Text> */}
          <Text
            style={{ ...commonStyles.text, ...styles.dateAndTime }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  entryCard: {
    height: 60,
    width: Dimensions.get('window').width * 0.9, //'100%',

    alignItems: 'center',
    justifyContent: 'center',

    //iOS
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,

    // android
    elevation: 10,

    borderRadius: 20,
    backgroundColor: Colors.primary5,
    marginTop: 16,
  },

  button: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },

  content: {
    //width: '90%',
    //flex: 1,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 7,
  },

  index: {
    fontFamily: 'poppins-medium',
    fontSize: 28,
    height: 60,
    paddingVertical: 11,
    color: Colors.accent1,
    paddingHorizontal: 20,
  },

  location: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark5,
    width: 280,
  },

  dateAndTime: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.dark5,
    width: 280,
  },
});

export default ClockingItem;
