import React, { useState, useEffect } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors.js';

import * as appDataActions from '../../store/actions/appData.js';
import QRMask from '../../Resources/SVGs/QR_Mask.svg';

const ScannerScreen = (props) => {
  const [scanned, setScanned] = useState(false);

  const dispatch = useDispatch();

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  // disable and hide bottom navigation on this screen
  useEffect(() => {
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () => {
      props.navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: Colors.primary5,
          height: 70,
          display: 'flex',
        },
      });
    };
  }, []);

  // get permissions hook
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await BarCodeScanner.getPermissionsAsync();

      // if permissions can't be found, request them from the user
      if (status !== 'granted') {
        status = await BarCodeScanner.requestPermissionsAsync();
      }

      // if permissions still haven't been granted
      if (status !== 'granted') {
        Alert.alert('Camera permissions', 'Camera acces not granted', [
          {
            text: 'Go back',
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ]);
      }
    };

    getPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);

    const locationName = 'Location name from Firebase';

    Alert.alert('You scanned', `Location : ${locationName}`, [
      {
        text: 'Confirm',
        onPress: () => {
          // save the scanned location
          // go back to home screen
          props.navigation.goBack();
        },
      },
      {
        text: 'Scan again',
        onPress: () => {
          setScanned(false);
        },
      },
    ]);

    // store the location id in redux
    dispatch(appDataActions.setClockingData('locationId', data));
  };

  return (
    <View style={styles.container}>
      <View style={styles.fillerTop}>
        <Text style={styles.cameraTitle}> Scan the location QR Code </Text>
      </View>

      {/* <QRMask width={'100%'} height={'100%'} /> */}
      <View style={styles.scanContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
          style={
            Platform.OS === 'ios'
              ? { height: 250, width: 250 }
              : { height: '100%', width: '100%', padding: 0, marginTop: -100 }
          }
        />
      </View>

      <View style={styles.fillerBottom}>
        <Text style={styles.infoText}>
          Point the camera at the QR Code and it will be automatically scanned
        </Text>
        <Text style={styles.orText}> or </Text>
        {/*  add CANCEL button here */}
        <TouchableComponent
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <View style={styles.cancelButtonContainer}>
            <Text style={styles.cancelButtonText}> Cancel </Text>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },

  fillerTop: {
    position: 'relative',
    marginTop: 0,
    width: Dimensions.get('screen').width,
    height:
      (Dimensions.get('screen').height - Dimensions.get('screen').width) * 0.35,
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fillerBottom: {
    position: 'absolute',
    marginTop:
      (Dimensions.get('screen').height - Dimensions.get('screen').width) *
        0.35 +
      Dimensions.get('screen').width,
    width: Dimensions.get('screen').width,
    height:
      (Dimensions.get('screen').height - Dimensions.get('screen').width) * 0.65,
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingBottom: '15%',
  },

  scanContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    overflow: 'hidden',
  },

  cameraTitle: {
    marginTop: 50,
    fontFamily: 'poppins-medium',
    fontSize: 24,
    color: '#fff',
  },

  infoText: {
    fontFamily: 'poppins-regular',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },

  orText: {
    fontFamily: 'poppins-regular',
    fontSize: 18,
    color: '#636669',
  },

  cancelButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'red',
  },

  cancelButtonText: {
    fontFamily: 'poppins-medium',
    fontSize: 24,
    color: '#fff',
  },
});

export default ScannerScreen;
