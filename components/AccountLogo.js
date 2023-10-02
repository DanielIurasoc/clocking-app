import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import AccountImage from '../Resources/account_photo.jpg';

const AccountLogo = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={AccountImage} style={styles.image} />
        </View>
        <Text style={styles.title}> John Doe Jr. </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 140,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
  },

  imageContainer: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Colors.dark,
    borderStyle: 'solid',
    borderWidth: 3,
    overflow: 'hidden',
  },

  image: {
    width: '105%',
    height: '105%',
  },

  title: {
    height: 50,
    marginTop: 20,
    fontFamily: 'antipasto-regular',
    fontSize: 40,
    color: Colors.dark,
  },
});

export default AccountLogo;
