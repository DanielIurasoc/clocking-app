import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import CustomText from '../../components/CustomText.js';
import { useDispatch } from 'react-redux';

import { setActiveScreen } from '../../store/actions/activeScreen.js';

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setActiveScreen('Home'));
    }, [dispatch])
  );

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>This is the Home Screen!</CustomText>
      <TouchableOpacity
        style={{ height: 50, width: 50, backgroundColor: '#000' }}
        onPress={() => props.navigation.openDrawer()}
      />
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

export default HomeScreen;
