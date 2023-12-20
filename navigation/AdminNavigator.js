import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import Colors from '../constants/Colors.js';
import HomeSVG from '../Resources/SVGs/home_icon.svg';
import ClockingsSVG from '../Resources/SVGs/clockings_icon.svg';
import StatisticsSVG from '../Resources/SVGs/statistics_icon.svg';
import AccountSVG from '../Resources/SVGs/account_icon.svg';

import ValidateEntriesScreen from '../screens/admin/ValidateEntriesScreen.js';
import ClockingsScreen from '../screens/common/ClockingsScreen.js';
import DetailsScreen from '../screens/common/DetailsScreen.js';
import StatisticsScreen from '../screens/common/StatisticsScreen.js';
import AccountScreen from '../screens/common/AccountScreen.js';

// create the stack navigator
const myStack = createStackNavigator();
const myBottomTab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <myStack.Navigator
      initialRouteName="Validate"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerStatusBarHeight: 35,
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
          height: 140,
        },
      }}
      backBehaviour="history"
    >
      <myStack.Screen
        name="Validate"
        component={ValidateEntriesScreen}
        options={{
          title: 'Validate',
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
      <myStack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: 'Statistics',
        }}
      />
      <myStack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
        }}
      />
    </myStack.Navigator>
  );
}

/*function BottomNavigator() {
  return (
    <myBottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#9E2A2B',
      }}
    >
      <myBottomTab.Screen
        name={'Home'}
        component={StackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => {
            return <HomeSVG width={50} height={50} />;
          },
        }}
      />
      <myBottomTab.Screen
        name={'Clockings'}
        component={ClockingsScreen}
        options={{
          tabBarLabel: 'Clockings',
          tabBarIcon: () => {
            return <ClockingsSVG width={50} height={50} />;
          },
        }}
      />
      <myBottomTab.Screen
        name={'Statistics'}
        component={StatisticsScreen}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: () => {
            return <StatisticsSVG width={50} height={50} />;
          },
        }}
      />
      <myBottomTab.Screen
        name={'Account'}
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: () => {
            return <AccountSVG width={50} height={50} />;
          },
        }}
      />
    </myBottomTab.Navigator>
  );
} */

const styles = StyleSheet.create({});

export default function AdminNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
