import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';

import Colors from '../constants/Colors.js';

import AccountLogo from '../components/AccountLogo.js';
import HomeScreen from '../screens/user/HomeScreen.js';
import ClockingsScreen from '../screens/common/ClockingsScreen.js';
import DetailsScreen from '../screens/common/DetailsScreen.js';

// create the stack navigator
const myStack = createStackNavigator();

// to be updated with BottomNav

function ClockingsNavigator() {
  return (
    // return the stack navigator
    // to be updated
    <myStack.Navigator
      initialRouteName="Clockings"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerStatusBarHeight: 35,
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
          height: 140,
        },
      }}
    >
      <myStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <myStack.Screen
        name="Clockings"
        component={ClockingsScreen}
        options={{
          headerTitle: AccountLogo,
        }}
      />
      <myStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Details',
        }}
      />
    </myStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <ClockingsNavigator />
    </NavigationContainer>
  );
}
