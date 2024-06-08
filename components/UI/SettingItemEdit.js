import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { ThemeContext } from './ThemeContext';
import Colors from '../../constants/Colors';

const SettingItemEdit = ({ label, secureTextEntry, ...inputProps }) => {
  // color context
  const { theme } = useContext(ThemeContext);
  const styles = myStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.label}> {label} </Text>
      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry}
        {...inputProps}
      />
    </View>
  );
};

const myStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 2,
      margin: 10,
      position: 'relative',
    },

    label: {
      fontFamily: 'poppins-light',
      fontSize: 14,
      position: 'absolute',
      top: -10,
      left: 16,
      padding: 0,
      backgroundColor: theme.primary1,
      color: theme.primary5,
      zIndex: 1,
    },

    input: {
      flex: 1,
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: theme.primary5,
      borderRadius: 20,
      //zIndex: 0,
    },
  });

export default SettingItemEdit;
