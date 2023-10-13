import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ClockingItem from '../../components/ClockingItem.js';
import SortButton from '../../components/SortButton.js';

import commonStyles from '../../components/commonStyles.js';
import CommonHeader from '../../components/CommonHeader.js';
import { setActiveScreen } from '../../store/actions/activeScreen.js';

const ClockingsScreen = (props) => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setActiveScreen('Clockings'));
    }, [dispatch])
  );

  const clockings = useSelector((state) => state.clockings.allClockings);

  return (
    <View style={styles.mainContainer}>
      <CommonHeader />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={{ ...commonStyles.text, ...styles.title }}>
            All your entries to date
          </Text>
          <SortButton onCardPress={() => {}} />
        </View>
        <FlatList
          data={clockings}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ClockingItem
              index={itemData.index}
              location={itemData.item.locationId}
              date={itemData.item.date}
              startTime={itemData.item.startTime}
              endTime={itemData.item.endTime}
              onCardPress={() =>
                props.navigation.navigate('Details', {
                  title: itemData.item.title,
                  id: itemData.item.id,
                })
              }
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
