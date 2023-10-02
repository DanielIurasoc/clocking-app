import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import clockingsReducer from './store/reducers/clockings.js';
import AppNavigator from './navigation/AppNavigator.js';

SplashScreen.preventAutoHideAsync();

// reducer setup, to be updated
const reducer = {
  clockings: clockingsReducer,
};
const myStore = configureStore({ reducer });

// custom fonts object
const customFonts = {
  'antipasto-regular': require('./assets/fonts/antipasto-regular.otf'),
  'antipasto-light': require('./assets/fonts/antipasto-light.otf'),
  'antipasto-bold': require('./assets/fonts/antipasto-bold.otf'),
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
      <Provider store={myStore}>
        <AppNavigator />
      </Provider>
    </View>
  );
}
