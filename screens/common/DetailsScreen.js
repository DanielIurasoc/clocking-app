import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

import Colors from '../../constants/Colors.js';
import TimeCard from '../../components/UI/TimeCard.js';
import CommentCard from '../../components/UI/CommentCard.js';

const DetailsScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [clockingData, setClockingData] = useState({
    date: ' - ',
    startTime: ' - ',
    endTime: ' - ',
    pauseTime: ' - ',
    locationId: ' - ',
    locationName: ' - ',
    description: ' - ',
  });

  const clockingId = props.route.params?.id;
  const userId = useSelector((state) => state.auth.userId);

  // disable and hide bottom navigation on this screen
  useEffect(() => {
    fetchClockingData();

    // disable the drawer on this screen
    props.navigation.getParent().getParent()?.setOptions({
      swipeEdgeWidth: 0,
    });

    return () => {
      // reactivate the drawer
      props.navigation.getParent().getParent()?.setOptions({
        swipeEdgeWidth: 25,
      });
    };
  }, []);

  // PULL DOWN TO REFRESH SCROLL VIEW
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    updateClockingData();

    // simulate a short delay if wanted
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // FETCHING AND UPDATING DATA
  const fetchClockingData = async () => {
    // read the data from async
    const clockingsDataString = await AsyncStorage.getItem('userClockings');

    if (clockingsDataString) {
      // parse the data into an array
      const clockingsData = JSON.parse(clockingsDataString);

      // find the clocking matching the id
      const clockingFromAsync = clockingsData.find(
        (item) => item.clockingId === clockingId
      );

      if (clockingFromAsync !== null) {
        setClockingData(clockingFromAsync.clockingData);
      }
    }
  };

  const updateClockingData = async () => {
    const clockingsReference = database().ref(
      `/clockings/${userId}/${clockingId}/`
    );
    const locationsReference = database().ref(`/locations/`);

    try {
      // get clocking data
      const clockingSnapshot = await clockingsReference.once('value');
      if (!clockingSnapshot.val()) {
        throw new Error('Cannot access clocking data!');
        return;
      }

      const data = {
        date: clockingSnapshot.val().date,
        startTime: clockingSnapshot.val().startTime,
        endTime: clockingSnapshot.val().endTime,
        pauseTime: clockingSnapshot.val().pauseTime,
        locationId: clockingSnapshot.val().locationId,
        locationName: ' - ',
        description: clockingSnapshot.val().description,
      };

      // get location data only after successfully reading clokcing data
      const locationSnapshot = await locationsReference.once('value');
      if (locationSnapshot.val()[data.locationId].name) {
        const locationName = locationSnapshot.val()[data.locationId].name;

        setClockingData({ ...data, locationName });

        updateAsyncStorageData(clockingId, { ...data, locationName });
      }
    } catch (error) {
      console.error('Error reading data: ', error.message);
    }
  };

  const updateAsyncStorageData = async (clockingId, updatedClockingData) => {
    // read the data from async
    const clockingsDataString = await AsyncStorage.getItem('userClockings');

    const clockingDataArray = clockingsDataString
      ? JSON.parse(clockingsDataString)
      : [];

    const updatedClockingArray = clockingDataArray.map((obj) => {
      if (obj.clockingId === clockingId) {
        obj.clockingData = updatedClockingData;
      }
      return obj;
    });

    await AsyncStorage.setItem(
      'userClockings',
      JSON.stringify(updatedClockingArray)
    );
    console.log('updated');
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
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
        <View style={styles.detailsContainer}>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}> Entry status: </Text>
            <Text style={{ ...styles.statusInfo, ...{ color: Colors.green6 } }}>
              approved
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}> Location: </Text>
            <Text style={styles.locationInfo}>{clockingData.locationName}</Text>
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.workedContainer}>
              <Text style={styles.statusLabel}> Worked hours</Text>
              <Text style={styles.workedInfo}>
                {new Date(clockingData.endTime) -
                  new Date(clockingData.startTime)}
              </Text>
            </View>
            <Text style={styles.workedDate}>
              {clockingData.date !== ' - '
                ? new Date(clockingData.date).toLocaleDateString('ro-RO')
                : clockingData.date}
            </Text>
          </View>
        </View>
        <View style={styles.hoursContainer}>
          <TimeCard color="green" label="Start Time" content="08 : 00" />
          <TimeCard color="yellow" label="Pause" content="00 : 30" />
          <TimeCard color="red" label="End Time" content="17 : 30" />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}> Description </Text>
          <Text style={styles.description}>{clockingData.description}</Text>
        </View>
        <View style={styles.photosContainer}>
          <View style={styles.photosInnerContainer}>
            <Text style={styles.title}> Photos </Text>
            <View style={styles.photos}>
              <View style={styles.photo} />
              <View style={styles.photo} />
              <View style={styles.photo} />
            </View>
          </View>
        </View>
        <View style={styles.commentsContainer}>
          <Text style={styles.title}> Comments </Text>
          <CommentCard
            user="John Smithsennn"
            date="13.01.2023, 18:31"
            content="Content here, where is the content???"
          />
          <CommentCard
            user="John Smithsennn"
            date="13.01.2023, 18:31"
            content="Content here, where is the content???"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    //flex: 1,
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  detailsContainer: {
    width: '90%',
    height: 200,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusLabel: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
  },

  statusInfo: {
    fontFamily: 'poppins-medium',
    fontSize: 18,
  },

  locationInfo: {
    fontFamily: 'poppins-medium',
    fontSize: 18,
  },

  timeContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },

  workedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  workedInfo: {
    fontFamily: 'poppins-medium',
    fontSize: 18,
  },

  workedDate: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
  },

  hoursContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  descriptionContainer: {
    width: '90%',
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
    paddingBottom: 4,
  },

  description: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
  },

  photosContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  photosInnerContainer: {
    margin: 10,
    marginTop: 0,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.dark2,
    paddingTop: 5,
    paddingBottom: 15,
    elevation: 8,
  },

  photos: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  photo: {
    height: 75,
    width: 75,
    borderRadius: 20,
    backgroundColor: Colors.dark3,
  },

  commentsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default DetailsScreen;
