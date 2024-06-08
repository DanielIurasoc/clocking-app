import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

import commonStyles from '../commonStyles.js';
import { ThemeContext } from '../UI/ThemeContext.js';
import Colors from '../../constants/Colors.js';

const StandardButton = (props) => {
  // color context
  const { theme } = useContext(ThemeContext);
  const styles = myStyles(theme);

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <View style={{ ...styles.button, ...props.style }}>
      <TouchableComponent onPress={props.onPress}>
        {!props.title2 ? (
          <View style={styles.content1}>
            <Text style={{ ...commonStyles.text, ...styles.title1 }}>
              {props.title1}
            </Text>
          </View>
        ) : (
          <View style={styles.content2}>
            <Text style={{ ...commonStyles.text, ...styles.title1 }}>
              {props.title1}
            </Text>
            <Text style={{ ...commonStyles.text, ...styles.title2 }}>
              {props.title2}
            </Text>
          </View>
        )}
      </TouchableComponent>
    </View>
  );
};

const myStyles = (theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.primary5,
      borderRadius: 10,
      overflow: 'hidden',
    },

    content1: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 2,
      height: 50,
    },

    content2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 2,
      height: 50,
    },

    title1: {
      fontSize: 28,
    },

    title2: {
      fontFamily: 'poppins-medium',
      fontSize: 36,
      lineHeight: 48,
    },
  });

export default StandardButton;
