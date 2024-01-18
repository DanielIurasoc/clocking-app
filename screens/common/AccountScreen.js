import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  RefreshControl,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

import * as appDataActions from '../../store/actions/appData.js';

import Colors from '../../constants/Colors.js';
import HomeHeader from '../../components/UI/HomeHeader.js';
import SettingsCard from '../../components/UI/SettingsCard.js';
import SettingItemEdit from '../../components/UI/SettingItemEdit.js';
import CustomButton from '../../components/UI/CustomButton.js';

const AccountScreen = (props) => {
  const [selected, setSelected] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [refreshing, setRefreshing] = useState();
  const [userData, setUserData] = useState({
    firstName: '-',
    lastName: '-',
    email: '-',
    phone: '-',
    preferences: {},
  });

  const languageOptions = [
    { key: '1', value: 'English' },
    { key: '2', value: 'Romanian' },
    { key: '3', value: 'Italian' },
    { key: '4', value: 'French' },
    { key: '5', value: 'German' },
  ];

  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(appDataActions.setActiveScreen('Account'));
    }, [dispatch])
  );

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleSwitch = () => {
    setIsEnabled((prevState) => !prevState);
  };

  // PULL DOWN TO REFRESH SCROLL VIEW
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    updateUserData();

    // simulate a short delay if wanted
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // FETCHING AND UPDATING DATA
  const fetchUserData = async () => {
    // read the data from async
    const userDataString = await AsyncStorage.getItem('userData');

    if (userDataString) {
      // parse the data into an array
      const userDataFromAsync = JSON.parse(userDataString);

      if (userDataFromAsync !== null) {
        setUserData(userDataFromAsync);
      }
    }
  };

  const updateUserData = async () => {
    const userReference = database().ref(`/users/${userId}/`);

    try {
      // get user data
      const userDataSnapshot = await userReference.once('value');
      if (!userDataSnapshot.val()) {
        throw new Error('Cannot access user data!');
      }

      const data = {
        firstName: userDataSnapshot.val().firstName,
        lastName: userDataSnapshot.val().lastName,
        email: userDataSnapshot.val().email,
        phone: userDataSnapshot.val().phone,
        preferences: userDataSnapshot.val().preferences,
      };

      setUserData(data);
    } catch (error) {
      console.error('Error reading data: ', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary5]} // for Android
            tintColor={Colors.primary5} // for iOS
          />
        }
      >
        <View style={styles.container}>
          <HomeHeader
            onButtonPress={() => {
              props.navigation.openDrawer();
            }}
          />

          <SettingsCard title="Personal Information" iconName="account-circle">
            <SettingItemEdit
              label="First name"
              value={userData.firstName}
              placeholder="Enter your first name"
              keyboardType="default"
              secureTextEntry={false}
            />
            <SettingItemEdit
              label="Last name"
              value={userData.lastName}
              placeholder="Enter your last name"
              keyboardType="default"
              secureTextEntry={false}
            />
            <SettingItemEdit
              label="Email"
              value={userData.email}
              placeholder="Enter your email address"
              keyboardType="email-address"
              secureTextEntry={false}
            />
            <SettingItemEdit
              label="Phone"
              value={userData.phone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              secureTextEntry={false}
            />
            <View style={styles.buttonsContainer}>
              <CustomButton
                title="Discard"
                titleColor={Colors.primary1}
                buttonColor={Colors.primary5}
                onButtonPress={() => {}}
              />
              <CustomButton
                title="Save Changes"
                titleColor={Colors.primary1}
                buttonColor={Colors.secondary5}
                onButtonPress={() => {}}
              />
            </View>
          </SettingsCard>
          <SettingsCard title="Preferences" iconName="tune">
            <View style={styles.preferenceContainer}>
              <Text>Dark mode - toggle</Text>
              <View style={styles.toggleContainer}>
                <Text>Text1</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Text>Text2</Text>
              </View>
            </View>
            <Text>Sound - slider</Text>
            <View style={styles.preferenceContainer}>
              <Text>Language</Text>
              <SelectList
                setSelected={setSelected}
                data={languageOptions}
                save="value"
                fontFamily="poppins-regular"
                boxStyles={{
                  width: 150,
                  lineHeight: 40,
                  borderColor: Colors.primary5,
                }}
                inputStyles={{ fontSize: 14 }}
                defaultOption={{ key: '1', value: 'English' }}
              />
            </View>
          </SettingsCard>
          <SettingsCard title="Password and Security" iconName="key">
            <SettingItemEdit
              label="Current Password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Enter your current password"
            />
            <SettingItemEdit
              label="New Password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Enter your new password"
            />
            <SettingItemEdit
              label="Confirm Password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Confirm your new password"
            />
            <View style={styles.buttonsContainer}>
              <CustomButton
                title="Discard"
                titleColor={Colors.primary1}
                buttonColor={Colors.primary5}
                onButtonPress={() => {}}
              />
              <CustomButton
                title="Save Changes"
                titleColor={Colors.primary1}
                buttonColor={Colors.secondary5}
                onButtonPress={() => {}}
              />
            </View>
          </SettingsCard>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
  },

  settingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 2,
  },

  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  preferenceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default AccountScreen;
