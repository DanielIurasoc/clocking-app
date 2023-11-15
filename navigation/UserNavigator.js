import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constants/Colors.js';

import HomeScreen from '../screens/user/HomeScreen.js';
import ClockingsScreen from '../screens/common/ClockingsScreen.js';
import DetailsScreen from '../screens/common/DetailsScreen.js';
import StatisticsScreen from '../screens/common/StatisticsScreen.js';
import AccountScreen from '../screens/common/AccountScreen.js';

//import CustomDrawer from '../components/CustomDrawer.js';
import CustomDrawer from '../components/Navigation/CustomDrawer.js';

// create the drawer navigator
const myDrawer = createDrawerNavigator();

// create the stack navigator
const myStack = createStackNavigator();

// create the bottom navbar
const myBottomTab = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <myDrawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerInactiveTintColor: Colors.primary5,
        drawerActiveBackgroundColor: Colors.primary5,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'poppins-regular',
          fontSize: 15,
          paddingTop: 2,
          paddingBottom: 0,
          height: 25,
        },
      }}
    >
      <myDrawer.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
      />
    </myDrawer.Navigator>
  );
}

function ClockingsStackNavigator(props) {
  return (
    <myStack.Navigator
      initialRouteName="ClockingsScreen"
      screenOptions={{}}
      backBehaviour="history"
    >
      <myStack.Screen
        name="ClockingsScreen"
        component={ClockingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <myStack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
    </myStack.Navigator>
  );
}

function BottomTabsNavigator() {
  return (
    <myBottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#9E2A2B',
        tabBarStyle: {
          backgroundColor: Colors.primary5,
          height: 70,
        },
        tabBarInactiveTintColor: Colors.primary2,
        tabBarActiveTintColor: Colors.dark6,
      }}
    >
      <myBottomTab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="home" size={40} color={color} />
          ),
        }}
      />
      <myBottomTab.Screen
        name={'Clockings'}
        component={ClockingsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon
              name="clipboard-text-clock"
              size={35}
              color={color}
            />
          ),
        }}
      />
      <myBottomTab.Screen
        name={'Statistics'}
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="chart-bar" size={35} color={color} />
          ),
        }}
      />
      <myBottomTab.Screen
        name={'Account'}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcon name="account-cog" size={35} color={color} />
          ),
        }}
      />
    </myBottomTab.Navigator>
  );
}

export default function RegularNavigator(props) {
  return (
    <NavigationContainer>
      <DrawerNavigator />
      {/* <BottomTabNavigator /> */}
    </NavigationContainer>
  );
}
