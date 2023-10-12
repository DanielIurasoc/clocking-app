import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constants/Colors.js';

import HomeScreen from '../screens/user/HomeScreen.js';
import ClockingsScreen from '../screens/common/ClockingsScreen.js';
import DetailsScreen from '../screens/common/DetailsScreen.js';
import StatisticsScreen from '../screens/common/StatisticsScreen.js';
import AccountScreen from '../screens/common/AccountScreen.js';

//import CustomDrawer from '../components/CustomDrawer.js';
import CustomDrawerNew from '../components/CustomDrawerNew.js';

// create the drawer navigator
const myDrawer = createDrawerNavigator();

// create the stack navigator
const myStack = createNativeStackNavigator();

// create the bottom navbar
const myBottomTab = createBottomTabNavigator();

// function DrawerNavigator(props) {
//   return (
//     <myDrawer.Navigator
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       screenOptions={{
//         headerShown: false,
//         drawerInactiveTintColor: Colors.primary5,
//         drawerActiveBackgroundColor: Colors.primary5,
//         drawerActiveTintColor: '#fff', //Colors.primary5,'
//         drawerLabelStyle: {
//           marginLeft: -25,
//           fontFamily: 'poppins-regular',
//           fontSize: 15,
//           paddingTop: 2,
//           paddingBottom: 0,
//           height: 25,
//         },
//       }}
//     >
//       <myDrawer.Screen
//         name="Home"
//         component={BottomTabNavigator}
//         options={{
//           drawerLabel: 'Home',
//           drawerIcon: ({ color }) => (
//             <MaterialCommunityIcon
//               name="home"
//               size={25}
//               color={color}
//               style={{ paddingLeft: 10 }}
//             />
//           ),
//         }}
//       />
//       <myDrawer.Screen
//         name="MyClockings"
//         component={ClockingsScreen}
//         options={{
//           drawerLabel: 'My Clockings',
//           drawerIcon: ({ color }) => (
//             <MaterialCommunityIcon
//               name="view-list"
//               size={25}
//               color={color}
//               style={{ paddingLeft: 10 }}
//             />
//           ),
//         }}
//       />
//       <myDrawer.Screen
//         name="Statistics"
//         component={StatisticsScreen}
//         options={{
//           drawerLabel: 'Statistics',
//           drawerIcon: ({ color }) => (
//             <MaterialCommunityIcon
//               name="chart-bar"
//               size={25}
//               color={color}
//               style={{ paddingLeft: 10 }}
//             />
//           ),
//         }}
//       />
//       <myDrawer.Screen
//         name="AccountSettings"
//         component={AccountScreen}
//         options={{
//           drawerLabel: 'Account Settings',
//           drawerIcon: ({ color }) => (
//             <MaterialCommunityIcon
//               name="cog"
//               size={25}
//               color={color}
//               style={{ paddingLeft: 10 }}
//             />
//           ),
//         }}
//       />
//     </myDrawer.Navigator>
//   );
// }

function DrawerNavigator() {
  return (
    <myDrawer.Navigator
      drawerContent={(props) => <CustomDrawerNew {...props} />}
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
