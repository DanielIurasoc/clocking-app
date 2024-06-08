import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ThemeContext } from '../../components/UI/ThemeContext.js';
import CustomText from '../../components/CustomText.js';

const ValidateEntriesScreen = (props) => {
  // color context
  const { theme } = useContext(ThemeContext);
  const styles = myStyles(theme);

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>
        This is the Validation Screen!
      </CustomText>
    </View>
  );
};

const myStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      fontSize: 20,
    },
  });

export default ValidateEntriesScreen;
