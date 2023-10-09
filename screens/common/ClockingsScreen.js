import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ClockingItem from '../../components/ClockingItem.js';
import SortButton from '../../components/SortButton.js';

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
      <SortButton style={styles.sortButton} onCardPress={() => {}} />
      <FlatList
        data={clockings}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ClockingItem
            index={itemData.index}
            title={itemData.item.title}
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
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    //flexDirection: 'column',
    alignItems: 'center',
  },

  sortButton: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginTop: 20,
  },
});

export default ClockingsScreen;
