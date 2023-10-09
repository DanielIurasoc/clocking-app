import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import CustomText from '../../components/CustomText.js';
import UserNavigator from '../../navigation/UserNavigator.js';

const LoginScreen = (props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>This is the Login Screen!</CustomText>
      <Button
        title="Login"
        onPress={() => {
          return <UserNavigator />;
        }}
      />
      <Button
        title="Register now"
        onPress={() => {
          props.navigation.navigate('Register');
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

export default LoginScreen;
