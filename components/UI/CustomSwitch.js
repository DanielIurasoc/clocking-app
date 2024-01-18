import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-switch';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/Colors';

const CustomSwitch = ({
  isEnabled,
  toggleSwitch,
  iconOn,
  iconOff,
  colorOn,
  barColorOn,
  colorOff,
  barColorOff,
  iconColor,
  size,
}) => {
  //const [isEnabled, setIsEnabled] = useState(false);

  //   const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Switch
      barHeight={20}
      switchWidth={50}
      switchHeight={20}
      value={isEnabled}
      onValueChange={toggleSwitch}
      disabled={false}
      backgroundActive={barColorOn}
      backgroundInactive={barColorOff}
      circleActiveColor={colorOn}
      circleInActiveColor={colorOff}
      renderInsideCircle={() =>
        isEnabled ? (
          <MaterialCommunityIcon name={iconOn} size={size} color={iconColor} />
        ) : (
          <MaterialCommunityIcon name={iconOff} size={size} color={iconColor} />
        )
      }
      changeValueImmediately={true}
      innerCircleStyle={{
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      outerCircleStyle={{}}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={2}
      switchRightPx={2}
      switchWidthMultiplier={2}
      switchBorderRadius={30}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomSwitch;
