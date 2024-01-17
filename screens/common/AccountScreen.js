import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';

import * as appDataActions from '../../store/actions/appData.js';

import Colors from '../../constants/Colors.js';
import HomeHeader from '../../components/UI/HomeHeader.js';
import SettingsCard from '../../components/UI/SettingsCard.js';
import SettingItemEdit from '../../components/UI/SettingItemEdit.js';
import CustomButton from '../../components/UI/CustomButton.js';

const AccountScreen = (props) => {
  const [selected, setSelected] = useState('');

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(appDataActions.setActiveScreen('Account'));
    }, [dispatch])
  );

  const languageOptions = [
    { key: '1', value: 'English' },
    { key: '2', value: 'Romanian' },
    { key: '3', value: 'Italian' },
    { key: '4', value: 'French' },
    { key: '5', value: 'German' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <HomeHeader
            onButtonPress={() => {
              props.navigation.openDrawer();
            }}
          />

          <SettingsCard title="Personal Information" iconName="account-circle">
            <SettingItemEdit
              label="First name"
              value="John"
              placeholder="Enter your first name"
              keyboardType="default"
              secureTextEntry={false}
            />
            <SettingItemEdit
              label="Last name"
              value="Smithsennn"
              placeholder="Enter your last name"
              keyboardType="default"
              secureTextEntry={false}
            />
            <SettingItemEdit
              label="Email"
              value="john@smithsennn.com"
              placeholder="Enter your email address"
              keyboardType="email-address"
              secureTextEntry={false}
            />
            <SettingItemEdit
              label="Phone"
              value="12353254345"
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
            <Text>Dark mode - toggle</Text>
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
});

export default AccountScreen;
