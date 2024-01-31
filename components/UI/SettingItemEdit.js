import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../../constants/Colors';

const SettingItemEdit = ({ label, secureTextEntry, ...inputProps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}> {label} </Text>
      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry}
        {...inputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 2,
    margin: 10,
    position: 'relative',
  },

  label: {
    fontFamily: 'poppins-light',
    fontSize: 14,
    position: 'absolute',
    top: -10,
    left: 16,
    padding: 0,
    backgroundColor: Colors.primary1,
    color: Colors.primary5,
    zIndex: 1,
  },

  input: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.primary5,
    borderRadius: 20,
    //zIndex: 0,
  },
});

export default SettingItemEdit;
