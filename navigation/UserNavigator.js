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
import ScannerScreen from '../screens/user/ScannerScreen.js';

import CustomDrawer from '../components/Navigation/CustomDrawer.js';
import { useSelector } from 'react-redux';

// create the drawer navigator
const myDrawer = createDrawerNavigator();

// create the stack navigator for Home / Scanner
const myHomeStack = createStackNavigator();

// create the stack navigator for Clockings / Details
const myClockingsStack = createStackNavigator();

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
        //swipeEdgeWidth: 0,
      }}
    >
      <myDrawer.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
      />
    </myDrawer.Navigator>
  );
}

function HomeStackNavigator(props) {
  return (
    <myHomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{}}
      backBehaviour="history"
    >
      <myHomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <myHomeStack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          headerShown: false,
        }}
        // screenOptions={{
        //   swipeEdgeWidth:
        //     useSelector((state) => state.appData.activeScreen) === 'Scanner'
        //       ? 0
        //       : '20%',
        //   // swipeEnabled:
        //   //   useSelector((state) => state.appData.activeScreen) === 'Scanner'
        //   //     ? false
        //   //     : true,
        // }}
      />
    </myHomeStack.Navigator>
  );
}

function ClockingsStackNavigator(props) {
  return (
    <myClockingsStack.Navigator
      initialRouteName="ClockingsScreen"
      screenOptions={{}}
      backBehaviour="history"
    >
      <myClockingsStack.Screen
        name="ClockingsScreen"
        component={ClockingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <myClockingsStack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />
    </myClockingsStack.Navigator>
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
        tabBarHideOnKeyboard: true,
      }}
    >
      <myBottomTab.Screen
        name={'Home'}
        component={HomeStackNavigator}
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
