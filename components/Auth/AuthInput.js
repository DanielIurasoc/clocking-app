import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const AuthInput = (props) => {
  return (
    <View style={{ ...styles.input, ...props.style }}>
      <TextInput placeholder={props.label} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default AuthInput;
