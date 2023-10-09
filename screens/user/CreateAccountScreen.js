import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import CustomText from '../../components/CustomText.js';

const CreateAccountScreen = (props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>
        This is the Create Account Screen!
      </CustomText>
      <Button
        title="Create Account"
        onPress={() => {
          props.navigation.navigate('Home');
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          props.navigation.navigate('Login');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
  },
});

export default CreateAccountScreen;
