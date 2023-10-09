import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = (props) => {
  return (
    <Text
      // merge incoming styles from props with the default style defined here
      style={{ ...styles.content, ...props.style }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
  },
});

export default CustomText;
