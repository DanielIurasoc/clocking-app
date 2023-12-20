import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import commonStyles from '../commonStyles.js';
import Colors from '../../constants/Colors.js';

const DrawerNavButton = ({
  iconName,
  title,
  isActive,
  onButtonPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...{
          height: 40,
          width: '84%',
          marginLeft: '8%',
          flexDirection: 'row',
          justifyContent: 'left',
          paddingHorizontal: 10,
          borderRadius: 5,
          alignItems: 'center',
          backgroundColor:
            isActive === true ? Colors.primary5 : Colors.primary1,
        },
        ...style,
      }}
      onPress={onButtonPress}
    >
      <MaterialCommunityIcon
        name={iconName}
        size={25}
        style={{
          color: isActive === true ? Colors.primary1 : Colors.primary5,
        }}
      />

      <Text
        style={{
          ...commonStyles.text,
          ...{
            fontFamily: 'poppins-medium',
            fontSize: 16,
            color: isActive === true ? Colors.primary1 : Colors.dark4,
            marginLeft: 10,
            paddingTop: 5,
          },
        }}
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DrawerNavButton;
