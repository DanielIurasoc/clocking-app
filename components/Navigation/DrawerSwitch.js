import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// TO BE DONE

const DrawerSwitch = (props) => {
  const [activeOption, setActiveOption] = useState(props.activeOption);

  return (
    <TouchableOpacity style={styles.switch}>
      <props.Icon1 />
      <props.Icon2 />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    height: 20,
    width: 60,
  },
});

export default DrawerSwitch;
