import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({
  buttonColor,
  title,
  titleColor,
  titleSize,
  onButtonPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: buttonColor,
        overflow: 'hidden',
      }}
      onPress={onButtonPress}
    >
      <Text
        style={{
          fontFamily: 'poppins-medium',
          fontSize: titleSize ? titleSize : 16,
          color: titleColor,
          lineHeight: 28,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CustomButton;
