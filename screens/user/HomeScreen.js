import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import * as appDataActions from '../../store/actions/appData.js';

import Colors from '../../constants/Colors.js';
import commonStyles from '../../components/commonStyles.js';
import CustomText from '../../components/CustomText.js';
import HomeHeader from '../../components/UI/HomeHeader.js';
import HomeButton from '../../components/UI/HomeButton.js';

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(appDataActions.setActiveScreen('Home'));
    }, [dispatch])
  );

  const onDrawerButtonPress = () => {
    props.navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <HomeHeader onButtonPress={onDrawerButtonPress} />
      <View style={styles.mainContainer}>
        <CustomText style={styles.mainHeader}>Work details below :</CustomText>
        <HomeButton
          iconName={'qrcode-scan'}
          labelText={'Scan location (QR Code):'}
          chosenText={'Bucharest, 15 Main Street'}
          onButtonPress={() => {}}
          style={{ marginTop: 10 }}
        />
        <HomeButton
          iconName={'calendar-clock-outline'}
          labelText={'Select the date:'}
          chosenText={'Thuesday, October 12, 2023'}
          onButtonPress={() => {}}
          style={{ marginTop: 10 }}
        />
        <HomeButton
          iconName={'clock-edit-outline'}
          labelText={'Pick the start time:'}
          chosenText={'08 : 00'}
          onButtonPress={() => {}}
          style={{ marginTop: 10 }}
        />
        <HomeButton
          iconName={'clock-check-outline'}
          labelText={'Pick the end time:'}
          chosenText={'18 : 00'}
          onButtonPress={() => {}}
          style={{ marginTop: 10 }}
        />
        <TouchableOpacity style={styles.mainButton} onPress={() => {}}>
          <Text style={{ ...commonStyles.text, ...styles.mainButtonText }}>
            Add Entry
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainHeader: {
    fontSize: 20,
  },

  mainButton: {
    width: 130,
    height: 40,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: Colors.secondary8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainButtonText: {
    paddingTop: 4,
    fontSize: 18,
    color: Colors.accent1,
  },
});

export default HomeScreen;
