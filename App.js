import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

//import store from './store/store.js';

import CustomFonts from './constants/Fonts.js';
import AuthNavigator from './navigation/AuthNavigator.js';
import UserNavigator from './navigation/UserNavigator.js';
import AdminNavigator from './navigation/AdminNavigator.js';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navFlow = useSelector((state) => state.appData.navigationFlow);

  // loading fonts
  useEffect(() => {
    // define the function
    async function prepare() {
      try {
        await Font.loadAsync(CustomFonts);

        // artificial delay for style points
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        // something went wrong
        console.warn(e);
      } finally {
        // fonts were loaded, move on
        setFontsLoaded(true);
      }
    }

    // call it
    prepare();
  }, []);

  // Show/Hide the loading screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // fonst couldn't be loaded, error message shown instead of main app
  if (!fontsLoaded) {
    return <Text> Error occured while loading fonts! </Text>;
  }

  // start the app if everything went well
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {navFlow === 'auth' ? (
        <AuthNavigator />
      ) : navFlow === 'user' ? (
        <UserNavigator />
      ) : (
        <AdminNavigator />
      )}
      {/* use the Auth navigation stack at first use */}
      {/* <AuthNavigator /> */}

      {/* if the logged account is a regular user use the RegularNavigator */}
      {/* <UserNavigator /> */}

      {/* if the logged account is an admin user, use the AdminNavigator */}
      {/* <AdminNavigator /> */}
    </View>
  );
}
