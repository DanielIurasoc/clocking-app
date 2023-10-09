import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

import CustomText from '../../components/CustomText.js';
import { useDispatch } from 'react-redux';

import { setActiveScreen } from '../../store/actions/activeScreen.js';

const AccountScreen = (props) => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setActiveScreen('Account'));
    }, [dispatch])
  );

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>This is the Account Screen!</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
  },
});

export default AccountScreen;
