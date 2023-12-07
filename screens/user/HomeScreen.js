import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import database from '@react-native-firebase/database';

import * as appDataActions from '../../store/actions/appData.js';

import Time from '../../models/Time.js';

import Colors from '../../constants/Colors.js';
import commonStyles from '../../components/commonStyles.js';
import CustomText from '../../components/CustomText.js';
import HomeHeader from '../../components/UI/HomeHeader.js';
import HomeButton from '../../components/UI/HomeButton.js';

const HomeScreen = (props) => {
  const [locationName, setLocationName] = useState(' - ');
  const [date, setDate] = useState(useSelector((state) => state.appData.date));
  const [dateOpen, setDateOpen] = useState(false);
  const [startTime, setStartTime] = useState(
    useSelector((state) => state.appData.startTime)
  );
  const [startOpen, setStartOpen] = useState(false);
  const [endTime, setEndTime] = useState(
    useSelector((state) => state.appData.endTime)
  );
  const [endOpen, setEndOpen] = useState(false);
  const [pauseTime, setPauseTime] = useState(
    useSelector((state) => state.appData.pauseTime)
  );
  const [pauseOpen, setPauseOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const userId = useSelector((state) => state.auth.userId);
  const locationId = useSelector((state) => state.appData.locationId);
  const dispatch = useDispatch();

  const reference = database().ref(`/clockings/${userId}/`);

  const writeDataToDatabase = (description) => {
    // create the title for this specific clocking
    const title = locationName + ', ' + date;

    // write data
    reference.push({
      ownerId: userId,
      locationId,
      title,
      description,
      startTime: startTime.toString(),
      endTime: endTime.toString(),
      pauseTime: pauseTime.toString(),
      date: date.toString(),
    });
  };

  // set active screen
  useFocusEffect(
    React.useCallback(() => {
      dispatch(appDataActions.setActiveScreen('Home'));
    }, [dispatch])
  );

  if (locationId !== '' && locationName === ' - ') {
    database()
      .ref(`/locations/${locationId}/`)
      .once('value')
      .then((snapshot) => {
        setLocationName(snapshot.val().name);
      });
  }

  const onDrawerButtonPress = () => {
    props.navigation.openDrawer();
  };

  const clearData = () => {
    setLocationName(' - ');
    setDate(' - ');
    setStartTime(' - ');
    setEndTime(' - ');
    setPauseTime(' 00 : 00 ');
  };

  return (
    <View style={styles.container}>
      <HomeHeader onButtonPress={onDrawerButtonPress} />
      <View style={styles.mainContainer}>
        <CustomText style={styles.mainHeader}>Work details below :</CustomText>
        <HomeButton
          iconName={'qrcode-scan'}
          labelText={'Scan location (QR Code):'}
          chosenText={locationName}
          onButtonPress={() => {
            props.navigation.navigate('Scanner');
          }}
          style={{ marginTop: 10 }}
        />

        {/* DATE PICKER HERE */}
        <HomeButton
          iconName={'calendar-clock-outline'}
          labelText={'Select the date:'}
          chosenText={date !== ' - ' ? date.toLocaleDateString('ro-RO') : date}
          onButtonPress={() => {
            setDateOpen(true);
          }}
          style={{ marginTop: 10 }}
        />
        <DatePicker
          modal
          mode="date"
          maximumDate={new Date()}
          open={dateOpen}
          date={date === ' - ' ? new Date() : date}
          onConfirm={(date) => {
            setDateOpen(false);
            setDate(date);
            dispatch(appDataActions.setClockingData('date', date));
          }}
          onCancel={() => {
            setDateOpen(false);
          }}
        />

        {/* START TIME PICKER */}
        <HomeButton
          iconName={'clock-edit-outline'}
          labelText={'Pick the start time:'}
          chosenText={
            startTime === ' - '
              ? startTime
              : ' ' +
                startTime.getHours().toString().padStart(2, '0') +
                ' : ' +
                startTime.getMinutes().toString().padStart(2, '0')
          }
          onButtonPress={() => {
            setStartOpen(true);
          }}
          style={{ marginTop: 10 }}
        />
        <DatePicker
          modal
          mode="time"
          locale="ro"
          is24hourSource="locale"
          minuteInterval={5}
          title="Select the start time"
          open={startOpen}
          date={startTime === ' - ' ? new Date() : startTime}
          onConfirm={(date) => {
            setStartOpen(false);
            setStartTime(date);
            dispatch(appDataActions.setClockingData('startTime', date));
          }}
          onCancel={() => {
            setStartOpen(false);
          }}
        />

        {/* END TIME PICKER */}
        <HomeButton
          iconName={'clock-check-outline'}
          labelText={'Pick the end time:'}
          chosenText={
            endTime === ' - '
              ? endTime
              : ' ' +
                endTime.getHours().toString().padStart(2, '0') +
                ' : ' +
                endTime.getMinutes().toString().padStart(2, '0')
          }
          onButtonPress={() => {
            setEndOpen(true);
          }}
          style={{ marginTop: 10 }}
        />
        <DatePicker
          modal
          mode="time"
          locale="ro"
          is24hourSource="locale"
          minuteInterval={5}
          title="Select the finish time"
          open={endOpen}
          date={endTime === ' - ' ? new Date() : endTime}
          onConfirm={(date) => {
            setEndOpen(false);
            setEndTime(date);
            dispatch(appDataActions.setClockingData('endTime', date));
          }}
          onCancel={() => {
            setEndOpen(false);
          }}
        />

        {/* PAUSE TIME PICKER */}
        <HomeButton
          iconName={'clock-check-outline'}
          labelText={'Enter the pause duration:'}
          chosenText={
            pauseTime === ' 00 : 00 '
              ? pauseTime
              : new Time(pauseTime.getHours(), pauseTime.getMinutes()).getTime()
          }
          onButtonPress={() => {
            setPauseOpen(true);
          }}
          style={{ marginTop: 10 }}
        />
        <DatePicker
          modal
          mode="time"
          locale="ro"
          is24hourSource="locale"
          minuteInterval={5}
          title="Select the pause duration"
          open={pauseOpen}
          date={
            pauseTime === ' 00 : 00 '
              ? new Date(new Date().setHours(0, 0, 0, 0))
              : pauseTime
          }
          onConfirm={(date) => {
            setPauseOpen(false);
            setPauseTime(date);
            dispatch(appDataActions.setClockingData('pauseTime', date));
          }}
          onCancel={() => {
            setPauseOpen(false);
          }}
        />

        {/* SUBMIT INPUTS BUTTON */}
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => {
            writeDataToDatabase('Did good work. Expect big pay');

            // update redux store
            dispatch(appDataActions.clearClockingData());

            // update the local reducer
            clearData();
          }}
        >
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
