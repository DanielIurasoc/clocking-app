import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomText from '../../components/CustomText.js';
import commonStyles from '../../components/commonStyles.js';

const DetailsScreen = (props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>This is the Details Screen!</CustomText>
      <Text style={{ ...commonStyles.text, ...styles.text }}>
        {props.route.params?.title}
      </Text>
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

export default DetailsScreen;
