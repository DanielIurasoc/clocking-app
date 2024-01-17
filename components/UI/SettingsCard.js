import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/Colors';

const SettingsCard = (props) => {
  const { title, iconName } = props;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcon
            name={iconName}
            size={25}
            color={Colors.primary5}
            style={styles.headerIcon}
          />
          <Text style={styles.headerText}> {title} </Text>
        </View>
        <View style={styles.content}>{props.children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    paddingTop: 5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,
    backgroundColor: Colors.primary1,
    elevation: 8,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerIcon: {
    marginBottom: 5,
  },

  headerText: {
    fontFamily: 'poppins-medium',
    color: Colors.primary5,
    fontSize: 20,
  },

  content: {
    width: '80%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsCard;
