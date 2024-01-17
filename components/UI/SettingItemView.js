import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingItemView = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}> {props.label} </Text>
      <Text style={styles.value}> {props.value} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingVertical: 2,
  },

  label: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
  },

  value: {
    fontFamily: 'poppins-medium',
    fontSize: 16,
  },
});

export default SettingItemView;
