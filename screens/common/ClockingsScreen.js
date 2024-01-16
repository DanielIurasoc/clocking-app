import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';

import ClockingItem from '../../components/ClockingItem.js';
import SortButton from '../../components/SortButton.js';

import commonStyles from '../../components/commonStyles.js';
import CommonHeader from '../../components/UI/CommonHeader.js';
import * as appDataActions from '../../store/actions/appData.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClockingsScreen = (props) => {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [clockings, setClockings] = useState(null);
  const userId = useSelector((state) => state.auth.userId);

  // set the active screen
  useFocusEffect(
    React.useCallback(() => {
      dispatch(appDataActions.setActiveScreen('Clockings'));
    }, [dispatch])
  );

  useEffect(() => {
    fetchClockingsFromAsync();
  }, []);

  const writeToAsyncStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    const clockingsReference = database().ref(`/clockings/${userId}/`);

    clockingsReference.once('value').then((snapshot) => {
      const convertedClockingsArray = Object.keys(snapshot.val()).map(
        (clockingId) => ({
          clockingId,
          clockingData: snapshot.val()[clockingId],
        })
      );

      writeToAsyncStorage('userClockings', convertedClockingsArray);
      setClockings(convertedClockingsArray);
      setIsRefreshing(false);
    });
  };

  const fetchClockingsFromAsync = async () => {
    // try from async storage
    try {
      const localData = await AsyncStorage.getItem('userClockings');

      if (localData) {
        // console.log(JSON.parse(localData));
        setClockings(JSON.parse(localData));
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CommonHeader
        onButtonPress={() => {
          props.navigation.openDrawer();
        }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={{ ...commonStyles.text, ...styles.title }}>
            All your entries to date
          </Text>
          <SortButton onSortPress={() => {}} />
        </View>
        <FlatList
          data={clockings}
          onRefresh={refreshData}
          refreshing={isRefreshing}
          keyExtractor={(item) => item.clockingId}
          renderItem={(itemData) => (
            <ClockingItem
              index={itemData.index}
              clockingData={itemData.item.clockingData}
              onCardPress={() => {
                props.navigation.navigate('Details', {
                  title: itemData.item.clockingData.title,
                  id: itemData.item.clockingId,
                });
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },

  contentContainer: {
    width: '90%',
    alignItems: 'center',
  },

  titleContainer: {
    width: '100%',
    height: 40,
    marginTop: -8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: 'poppins-medium',
    fontSize: 20,
  },
});

export default ClockingsScreen;
