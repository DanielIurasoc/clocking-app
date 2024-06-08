import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import commonStyles from '../commonStyles.js';

import { ThemeContext } from '../UI/ThemeContext.js';
import Colors from '../../constants/Colors.js';

const DrawerNavButton = ({
  iconName,
  title,
  isActive,
  onButtonPress,
  style,
}) => {
  // color context
  const { theme } = useContext(ThemeContext);

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
          backgroundColor: isActive === true ? theme.primary5 : theme.primary1,
        },
        ...style,
      }}
      onPress={onButtonPress}
    >
      <MaterialCommunityIcon
        name={iconName}
        size={25}
        style={{
          color: isActive === true ? theme.primary1 : theme.primary5,
        }}
      />

      <Text
        style={{
          ...commonStyles.text,
          ...{
            fontFamily: 'poppins-medium',
            fontSize: 16,
            color: isActive === true ? theme.primary1 : theme.dark4,
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
