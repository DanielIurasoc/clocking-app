import React, {
  useReducer,
  useEffect,
  useCallback,
  useState,
  useContext,
} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import database from '@react-native-firebase/database';

import * as appDataActions from '../../store/actions/appData.js';

import Time from '../../models/Time.js';

// import Colors from '../../constants/Colors.js';
import { ThemeContext } from '../../components/UI/ThemeContext.js';
import commonStyles from '../../components/commonStyles.js';
import CustomText from '../../components/CustomText.js';
import HomeHeader from '../../components/UI/HomeHeader.js';
import HomeButton from '../../components/UI/HomeButton.js';

const HomeScreen = (props) => {
  // APP DATA
  const userId = useSelector((state) => state.auth.userId);
  const locationId = useSelector((state) => state.appData.locationId);

  // HOME SCREEN DATA
  const dispatch = useDispatch();
  const reference = database().ref(`/clockings/${userId}/`);

  // color context
  const { theme } = useContext(ThemeContext);
  const styles = myStyles(theme);

  // FORM DATA
  const [formState, setFormState] = useState({
    locationName: ' - ',
    date: useSelector((state) => state.appData.date),
    dateOpen: false,
    startTime: useSelector((state) => state.appData.startTime),
    startOpen: false,
    endTime: useSelector((state) => state.appData.endTime),
    endOpen: false,
    pauseTime: useSelector((state) => state.appData.pauseTime),
    pauseOpen: false,
    isValid: false,
  });

  const {
    locationName,
    date,
    dateOpen,
    startTime,
    startOpen,
    endTime,
    endOpen,
    pauseTime,
    pauseOpen,
    isValid,
  } = formState;

  // set active screen
  useFocusEffect(
    React.useCallback(() => {
      dispatch(appDataActions.setActiveScreen('Home'));
    }, [dispatch])
  );

  // make sure to display the botton navigator on component mount
  useEffect(() => {
    // hide and disable the bottom navigation for the child screen
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        // display: 'none',
        backgroundColor: theme.primary5,
        height: 70,
        display: 'flex',
      },
    });
  }, []);

  // drawer open handler
  const onDrawerButtonPress = () => {
    props.navigation.openDrawer();
  };

  // grab location data from database if the location id is set
  if (locationId !== '' && locationName === ' - ') {
    database()
      .ref(`/locations/${locationId}/`)
      .once('value')
      .then((snapshot) => {
        // setLocationName(snapshot.val().name);
        if (snapshot.val()) {
          updateDataField('locationName', snapshot.val().name);
        }
      })
      .catch((error) => {
        console.error('Error reading location data: ', error);
      });
  }

  // write to Firebase method
  const writeDataToDatabase = (description) => {
    // create the title for this specific clocking
    const title = locationName + ', ' + date.toLocaleDateString('ro-RO');

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

  // method to update a specific field in the form state
  const updateDataField = (identifier, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [identifier]: value,
    }));
  };

  // clear the form data on submit
  const clearData = () => {
    updateDataField('locationName', ' - ');
    updateDataField('date', ' - ');
    updateDataField('startTime', ' - ');
    updateDataField('endTime', ' - ');
    updateDataField('pauseTime', ' 00 : 00 ');
    updateDataField('isValid', false);
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        onButtonPress={onDrawerButtonPress}
        title="Welcome, John M. Smithsennn"
      />
      <View style={styles.mainContainer}>
        <CustomText style={styles.mainHeader}>Work details below :</CustomText>
        <HomeButton
          iconName={'qrcode-scan'}
          labelText={'Scan location (QR Code):'}
          chosenText={locationName}
          onButtonPress={() => {
            //props.navigation.navigate('Scanner');
            props.navigation.replace('Scanner');
          }}
          style={{ marginTop: 10 }}
        />

        {/* DATE PICKER HERE */}
        <HomeButton
          iconName={'calendar-clock-outline'}
          labelText={'Select the date:'}
          chosenText={date !== ' - ' ? date.toLocaleDateString('ro-RO') : date}
          onButtonPress={() => {
            // setDateOpen(true);
            updateDataField('dateOpen', true);
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
            // setDateOpen(false);
            updateDataField('dateOpen', false);
            // setDate(date);
            updateDataField('date', date);
            dispatch(appDataActions.setClockingData('date', date));
          }}
          onCancel={() => {
            // setDateOpen(false);
            updateDataField('dateOpen', false);
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
            // setStartOpen(true);
            updateDataField('startOpen', true);
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
            // setStartOpen(false);
            updateDataField('startOpen', false);
            // setStartTime(date);
            updateDataField('startTime', date);
            dispatch(appDataActions.setClockingData('startTime', date));
          }}
          onCancel={() => {
            // setStartOpen(false);
            updateDataField('startOpen', false);
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
            // setEndOpen(true);
            updateDataField('endOpen', true);
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
            // setEndOpen(false);
            updateDataField('endOpen', false);
            // setEndTime(date);
            updateDataField('endTime', date);
            dispatch(appDataActions.setClockingData('endTime', date));
          }}
          onCancel={() => {
            // setEndOpen(false);
            updateDataField('endOpen', false);
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
            // setPauseOpen(true);
            updateDataField('pauseOpen', true);
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
            // setPauseOpen(false);
            updateDataField('pauseOpen', false);
            // setPauseTime(date);
            updateDataField('pauseTime', date);
            dispatch(appDataActions.setClockingData('pauseTime', date));
          }}
          onCancel={() => {
            // setPauseOpen(false);
            updateDataField('pauseOpen', false);
          }}
        />

        {/* SUBMIT INPUTS BUTTON */}
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => {
            writeDataToDatabase('Did good work. Expect big pay!!!');

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

const myStyles = (theme) =>
  StyleSheet.create({
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
      borderRadius: 20,
      backgroundColor: theme.accent5,
      justifyContent: 'center',
      alignItems: 'center',
    },

    mainButtonText: {
      fontFamily: 'poppins-medium',
      paddingTop: 4,
      fontSize: 18,
      color: theme.primary1,
    },
  });

export default HomeScreen;
