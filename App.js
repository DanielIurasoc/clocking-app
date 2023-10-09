import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import store from './store/store.js';

import AuthNavigator from './navigation/AuthNavigator.js';
import UserNavigator from './navigation/UserNavigator.js';
import AdminNavigator from './navigation/AdminNavigator.js';

SplashScreen.preventAutoHideAsync();

// custom fonts object
const customFonts = {
  'poppins-900': require('./assets/fonts/Poppins-Black.ttf'),
  'poppins-900-italic': require('./assets/fonts/Poppins-BlackItalic.ttf'),
  'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  'poppins-bold-italic': require('./assets/fonts/Poppins-BoldItalic.ttf'),
  'poppins-800': require('./assets/fonts/Poppins-ExtraBold.ttf'),
  'poppins-800-italic': require('./assets/fonts/Poppins-ExtraBoldItalic.ttf'),
  'poppins-200': require('./assets/fonts/Poppins-ExtraLight.ttf'),
  'poppins-200-italic': require('./assets/fonts/Poppins-ExtraLightItalic.ttf'),
  'poppins-italic': require('./assets/fonts/Poppins-Italic.ttf'),
  'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
  'poppins-light-italic': require('./assets/fonts/Poppins-LightItalic.ttf'),
  'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
  'poppins-medium-italic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
  'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
  'poppins-600': require('./assets/fonts/Poppins-SemiBold.ttf'),
  'poppins-600-italic': require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
  'poppins-thin': require('./assets/fonts/Poppins-Thin.ttf'),
  'poppins-thin-italic': require('./assets/fonts/Poppins-ThinItalic.ttf'),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // loading fonts
  useEffect(() => {
    // define the function
    async function prepare() {
      try {
        await Font.loadAsync(customFonts);

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
      <Provider store={store}>
        {/* use the Auth navigation stack at first use */}
        {/* <AuthNavigator /> */}

        {/* if the logged account is a regular user use the RegularNavigator */}
        <UserNavigator />

        {/* if the logged account is an admin user, use the AdminNavigator */}
        {/* <AdminNavigator /> */}
      </Provider>
    </View>
  );
}
