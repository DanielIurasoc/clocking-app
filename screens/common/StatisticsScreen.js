import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomText from '../../components/CustomText.js';

const StatisticsScreen = (props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>
        This is the Statistics Screen!
      </CustomText>
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

export default StatisticsScreen;
