import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import commonStyles from '../commonStyles';
import Colors from '../../constants/Colors';

const HomeButton = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.mainContainer, ...props.style }}>
      <TouchableComponent onPress={props.onButtonPress}>
        <View style={styles.buttonContainer}>
          <View style={styles.infoContainer}>
            <Text style={{ ...commonStyles.text, ...styles.labelText }}>
              {props.labelText}
            </Text>
            <Text style={{ ...commonStyles.text, ...styles.chosenText }}>
              {props.chosenText}
            </Text>
          </View>
          <MaterialCommunityIcon
            name={props.iconName}
            size={40}
            color={Colors.accent1}
            style={styles.infoIcon}
          />
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '90%',
    height: 60,
    backgroundColor: Colors.primary5,
    borderRadius: 20,
    //marginLeft: '5%',
    overflow: 'hidden',
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoContainer: {
    justifyContent: 'center',
    width: '70',
    height: '100%',
    marginLeft: '5%',
  },

  labelText: {
    fontSize: 16,
    lineHeight: 20,
  },

  chosenText: {
    lineHeight: 25,
    fontSize: 20,
  },

  infoIcon: {
    marginRight: '5%',
  },
});

export default HomeButton;
