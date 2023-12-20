import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

import StandardButton from '../../components/Auth/AuthButton.js';
import commonStyles from '../../components/commonStyles.js';

const LandingScreen = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../Resources/gradient_image.png')}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={{ ...commonStyles.text, ...styles.title }}>
            Track your time
          </Text>
          <Text style={{ ...commonStyles.text, ...styles.slogan }}>
            Simple. Efficient.
          </Text>
        </View>
        <StandardButton
          style={styles.button}
          title1="Lets log in"
          title2=">"
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    height: Dimensions.get('screen').height,
    justifyContent: 'space-between',
  },

  header: {
    paddingHorizontal: '10%',
    marginTop: Dimensions.get('screen').height * 0.2,
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 36,
    lineHeight: 40,
  },

  slogan: {
    lineHeight: 30,
    fontSize: 24,
  },

  button: {
    marginLeft: '10%',
    width: Dimensions.get('screen').width * 0.8,
    marginBottom: Dimensions.get('screen').height * 0.2,
  },
});

export default LandingScreen;
