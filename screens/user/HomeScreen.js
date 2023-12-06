import React, { useReducer, useCallback } from 'react';
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

// reducer logic here
const UPDATE_DATA = 'UPDATE_DATA';
const CLEAR_DATA = 'CLEAR_DATA';

const dataReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        [action.input]: action.value,
      };
    case CLEAR_DATA:
      return {
        ...state,
        locationId: '',
        date: ' - ',
        startTime: ' - ',
        endTime: ' - ',
        pauseTime: ' 00 : 00 ',
        dataIsValid: false,
      };
    default:
      return state;
  }
};

const HomeScreen = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const reference = database().ref(`/users/${userId}/`);

  // reducer define here
  const [dataInput, dispatchDataInput] = useReducer(dataReducer, {
    locationId: useSelector((state) => state.appData.locationId),
    date: useSelector((state) => state.appData.date),
    dateOpen: false,
    startTime: useSelector((state) => state.appData.startTime),
    startTimeOpen: false,
    endTime: useSelector((state) => state.appData.endTime),
    endTimeOpen: false,
    pauseTime: useSelector((state) => state.appData.pauseTime),
    pauseTimeOpen: false,
    dataIsValid: false,
  });

  const writeDataToDatabase = (
    locationId,
    description,
    startTime,
    endTime,
    pause,
    date
  ) => {
    const locationName = 'Bucharest, 15 Main Street';
    const title = locationName + ', ' + date;

    // write data
    reference
      .push()
      .set({
        clockingId: 'asdadawsa',
        ownerId: userId,
        locationId,
        title,
        description,
        startTime,
        endTime,
        pause,
        date,
      })
      .then(() => console.log('done'));
  };

  // set active screen
  useFocusEffect(
    React.useCallback(() => {
      dispatch(appDataActions.setActiveScreen('Home'));
    }, [dispatch])
  );

  const onDrawerButtonPress = () => {
    props.navigation.openDrawer();
  };

  const dataInputHandler = useCallback(
    (inputIdentifier, inputValue) => {
      dispatchDataInput({
        type: UPDATE_DATA,
        input: inputIdentifier,
        value: inputValue,
      });

      // save to redux store
      dispatch(appDataActions.setClockingData(inputIdentifier, inputValue));
    },
    [dispatchDataInput, dispatch]
  );

  return (
    <View style={styles.container}>
      <HomeHeader onButtonPress={onDrawerButtonPress} />
      <View style={styles.mainContainer}>
        <CustomText style={styles.mainHeader}>Work details below :</CustomText>
        <HomeButton
          iconName={'qrcode-scan'}
          labelText={'Scan location (QR Code):'}
          chosenText={'Bucharest, 15 Main Street'}
          onButtonPress={() => {
            props.navigation.navigate('Scanner');
          }}
          style={{ marginTop: 10 }}
        />

        {/* DATE PICKER HERE */}
        <HomeButton
          iconName={'calendar-clock-outline'}
          labelText={'Select the date:'}
          chosenText={
            dataInput.date !== ' - '
              ? dataInput.date.toLocaleDateString('ro-RO')
              : dataInput.date
          }
          onButtonPress={() => {
            dataInputHandler('dateOpen', true);
          }}
          style={{ marginTop: 10 }}
        />
        <DatePicker
          modal
          mode="date"
          maximumDate={new Date()}
          open={dataInput.dateOpen}
          date={dataInput.date === ' - ' ? new Date() : dataInput.date}
          onConfirm={(date) => {
            dataInputHandler('dateOpen', false);
            dataInputHandler('date', date);
            //dispatch(appDataActions.setClockingData('date', date));
          }}
          onCancel={() => {
            dataInputHandler('dateOpen', false);
          }}
        />

        {/* START TIME PICKER */}
        <HomeButton
          iconName={'clock-edit-outline'}
          labelText={'Pick the start time:'}
          chosenText={
            dataInput.startTime === ' - '
              ? dataInput.startTime
              : ' ' +
                dataInput.startTime.getHours().toString().padStart(2, '0') +
                ' : ' +
                dataInput.startTime.getMinutes().toString().padStart(2, '0')
          }
          onButtonPress={() => {
            dataInputHandler('startTimeOpen', true);
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
          open={dataInput.startTimeOpen}
          date={
            dataInput.startTime === ' - ' ? new Date() : dataInput.startTime
          }
          onConfirm={(date) => {
            dataInputHandler('startTimeOpen', false);
            dataInputHandler('startTime', date);
            // dispatch(appDataActions.setClockingData('startTime', date));
          }}
          onCancel={() => {
            dataInputHandler('startTimeOpen', false);
          }}
        />

        {/* END TIME PICKER */}
        <HomeButton
          iconName={'clock-check-outline'}
          labelText={'Pick the end time:'}
          chosenText={
            dataInput.endTime === ' - '
              ? dataInput.endTime
              : ' ' +
                dataInput.endTime.getHours().toString().padStart(2, '0') +
                ' : ' +
                dataInput.endTime.getMinutes().toString().padStart(2, '0')
          }
          onButtonPress={() => {
            dataInputHandler('endTimeOpen', true);
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
          open={dataInput.endTimeOpen}
          date={dataInput.endTime === ' - ' ? new Date() : dataInput.endTime}
          onConfirm={(date) => {
            dataInputHandler('endTimeOpen', false);
            dataInputHandler('endTime', date);
            // dispatch(appDataActions.setClockingData('endTime', date));
          }}
          onCancel={() => {
            dataInputHandler('endTimeOpen', false);
          }}
        />

        {/* PAUSE TIME PICKER */}
        <HomeButton
          iconName={'clock-check-outline'}
          labelText={'Enter the pause duration:'}
          chosenText={
            dataInput.pauseTime === ' 00 : 00 '
              ? dataInput.pauseTime
              : new Time(
                  dataInput.pauseTime.getHours(),
                  dataInput.pauseTime.getMinutes()
                ).getTime()
          }
          onButtonPress={() => {
            dataInputHandler('pauseTimeOpen', true);
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
          open={dataInput.pauseTimeOpen}
          date={
            dataInput.pauseTime === ' 00 : 00 '
              ? new Date(new Date().setHours(0, 0, 0, 0))
              : dataInput.pauseTime
          }
          onConfirm={(date) => {
            dataInputHandler('pauseTimeOpen', false);
            dataInputHandler('pauseTime', date);
            // dispatch(appDataActions.setClockingData('pauseTime', date));
          }}
          onCancel={() => {
            dataInputHandler('pauseTimeOpen', false);
          }}
        />

        {/* SUBMIT INPUTS BUTTON */}
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => {
            /*writeDataToDatabase(
              'asdasdas',
              'Did good work. Expect big pay',
              '08:00',
              '17:30',
              30,
              new Date()
            );*/
            console.log(dataInput);
            dispatch(appDataActions.clearClockingData());
            dispatchDataInput({ type: CLEAR_DATA });
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
