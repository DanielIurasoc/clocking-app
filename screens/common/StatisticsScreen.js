import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import CommonHeader from '../../components/UI/CommonHeader.js';

import * as appDataActions from '../../store/actions/appData.js';

const StatisticsScreen = (props) => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(appDataActions.setActiveScreen('Statistics'));
    }, [dispatch])
  );

  return (
    <View style={styles.container}>
      <CommonHeader
        onButtonPress={() => {
          props.navigation.openDrawer();
        }}
      />
      <View style={styles.mainContainer}>
        <Text> Statistics here </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatisticsScreen;
