import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LandingScreen from '../screens/common/LandingScreen.js';
import LoginScreen from '../screens/common/LoginScreen.js';
import RegisterScreen from '../screens/user/RegisterScreen.js';

// create the stack navigator
const myStack = createStackNavigator();

function StackNavigator() {
  return (
    <myStack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
      backBehaviour="history"
    >
      <myStack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          title: 'Landing',
        }}
      />
      <myStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
      <myStack.Screen
        name="Register"
        component={RegisterScreen}
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
