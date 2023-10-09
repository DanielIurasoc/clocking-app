import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/common/LoginScreen.js';
import CreateAccountScreen from '../screens/user/CreateAccountScreen.js';

// create the stack navigator
const myStack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <myStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
      backBehaviour="history"
    >
      <myStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <myStack.Screen
        name="Register"
        component={CreateAccountScreen}
        options={{
          title: 'Register',
        }}
      />
    </myStack.Navigator>
  );
}

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
