import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import * as authActions from './store/actions/auth.js';
import * as appDataActions from './store/actions/appData.js';

import { ThemeContext } from './components/UI/ThemeContext.js';
import AuthNavigator from './navigation/AuthNavigator.js';
import UserNavigator from './navigation/UserNavigator.js';
import AdminNavigator from './navigation/AdminNavigator.js';
import CustomFonts from './constants/Fonts.js';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  const navFlow = useSelector((state) => state.appData.navigationFlow);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

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

  // write given data to Async Storage in key-value pairs
  const writeToAsyncStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  // clean the saved data from Async Storage
  const cleanAsyncStorage = async () => {
    // call the remove method
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('clockingData');
      await AsyncStorage.removeItem('locationsData');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateAsyncStorage = (uid) => {
    // reference to the database slice the user needs
    const userDataReference = database().ref(`/users/${uid}/`);
    const clockingsReference = database().ref(`/clockings/${uid}/`);
    const locationsReference = database().ref(`/locations/`);

    userDataReference.once('value').then((snapshot) => {
      writeToAsyncStorage('userData', snapshot.val());
    });

    clockingsReference.once('value').then((snapshot) => {
      const convertedClockingsArray = Object.keys(snapshot.val()).map(
        (clockingId) => ({
          clockingId,
          clockingData: snapshot.val()[clockingId],
        })
      );

      writeToAsyncStorage('userClockings', convertedClockingsArray);
    });

    locationsReference.once('value').then((snapshot) => {
      writeToAsyncStorage('locationsData', snapshot.val());
    });
  };

  // handler for user state changes
  function onAuthStateChanged(user) {
    if (user !== null) {
      // store the user
      dispatch(authActions.updateId(user.uid));

      // read and save the data to Async storage
      updateAsyncStorage(user.uid);

      // TBD // change app flow based on user type
      dispatch(appDataActions.setNavigationFlow('user'));
    } else {
      // clean the storage from any leftover data
      cleanAsyncStorage();
    }

    if (isLoading) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return subscriber;
  }, []);

  // Show/Hide the loading screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return (
      <View>
        <Text> Loading. Please wait </Text>
        <ActivityIndicator size="large" color={theme.primary5} />
      </View>
    );
  }

  // fonts couldn't be loaded, error message shown instead of main app
  if (!fontsLoaded) {
    return <Text> Error occured while loading fonts! </Text>;
  }

  // start the app if everything went well
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* <ColorsUpdate /> */}
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
