import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authActions from './store/actions/auth.js';
import * as appDataActions from './store/actions/appData.js';
import AuthNavigator from './navigation/AuthNavigator.js';
import UserNavigator from './navigation/UserNavigator.js';
import AdminNavigator from './navigation/AdminNavigator.js';
import CustomFonts from './constants/Fonts.js';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navFlow = useSelector((state) => state.appData.navigationFlow);

  const dispatch = useDispatch();

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

  let userData;

  useEffect(() => {
    const tryLogin = async () => {
      try {
        userData = await AsyncStorage.getItem('userData');
      } catch (error) {
        console.log(e.message);
      }

      if (userData) {
        const transformedData = JSON.parse(userData);
        const { userToken, userId, expiryDate } = transformedData;

        const expirationDate = new Date(expiryDate);
        if (expirationDate > new Date() && userToken && userId) {
          // find the expiration time
          const expirationTime =
            expirationDate.getTime() - new Date().getTime();

          // log the user in
          dispatch(authActions.authenticate(userId, userToken, expirationTime));

          // check if the user is regular or admin TBD
          // set the app flow
          dispatch(appDataActions.setNavigationFlow('user'));
        }
      }
    };
    tryLogin();
  }, [dispatch]);

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
    </View>
  );
}
