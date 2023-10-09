import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerButton from './DrawerButton.js';
import commonStyles from './commonStyles.js';

import Colors from '../constants/Colors.js';

const CustomDrawer = (props) => {
  return (
    <View style={styles.drawerContainer}>
      <ImageBackground
        source={require('../Resources/headerBackground.png')}
        style={styles.drawerHeader}
      >
        <Image
          source={require('../Resources/account_photo.jpg')}
          style={styles.accountImage}
        />
        <View style={styles.accountDetailsContainer}>
          <Text style={{ ...commonStyles.text, ...styles.accountName }}>
            John M. Smithsen
          </Text>
          <Text style={{ ...commonStyles.text, ...styles.accountId }}>
            ID #00001
          </Text>
          <Text style={{ ...commonStyles.text, ...styles.accountWork }}>
            Edil Ruben Solutions
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.drawerContent}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.listContainer}
        >
          <View style={styles.navigationContainer}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>

        <Button
          title="Home"
          onPress={() => {
            props.navigation.navigate('BottomTabNavigator', {
              screen: 'Home2',
            });
          }}
        />

        {/* <View style={styles.line1} /> */}

        <View style={styles.functionalContainer}>
          <View style={styles.padding}>
            <Text style={{ ...commonStyles.text, ...styles.actions }}>
              Sound ON / OFF
            </Text>
            <Text style={{ ...commonStyles.text, ...styles.actions }}>
              Dark Mode ON / OFF
            </Text>
          </View>

          {/* <View style={styles.line2} /> */}

          <View style={styles.actionsContainer}>
            <DrawerButton
              title={'Log out'}
              iconName={'logout'}
              isActive={true}
            />
            <DrawerButton
              title={'Send us feedback'}
              iconName={'mail-outline'}
              isActive={true}
            />
            <DrawerButton
              title={'Developed by \nIurasoc Daniel, 2023'}
              iconName="copyright"
              isActive={false}
            />

            <Text style={{ ...commonStyles.text, ...styles.version }}>
              v0.0.1 - Alpha
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.primary1,
  },

  drawerHeader: {
    height: 160,
    backgroundColor: Colors.primary5,
    paddingTop: 50,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  accountDetailsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginTop: 30,
  },

  accountImage: {
    width: 80,
    height: 80,
    marginTop: 30,
    borderColor: Colors.dark5,
    borderWidth: 1,
    borderRadius: 40,
  },

  accountName: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: 'poppins-600',
  },

  accountId: {
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'poppins-medium',
  },

  accountWork: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'poppins-medium',
  },

  drawerContent: {
    flex: 1,
    flexDirection: 'column',
  },

  listContainer: {
    backgroundColor: Colors.primary1,
    paddingTop: 0,
  },

  navigationContainer: {
    paddingVertical: 10,
    marginBottom: 0,
  },

  functionalContainer: {
    backgroundColor: Colors.primary1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'left',
    //marginTop: -75,
    paddingBottom: 20,
    borderTopWidth: 2,
    borderTopColor: Colors.dark2,
  },

  line1: {
    alignSelf: 'center',
    marginVertical: 5,
    width: '90%',
    height: 2,
    backgroundColor: Colors.dark2,
    marginTop: -100,
  },

  line2: {
    alignSelf: 'center',
    marginVertical: 5,
    width: '90%',
    height: 2,
    backgroundColor: Colors.dark2,
  },

  padding: {
    paddingHorizontal: 30,
  },

  actionsContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 2,
    borderTopColor: Colors.dark2,
    //flex: 1,
  },

  version: {
    fontSize: 10,
    fontFamily: 'poppins-light',
    textAlign: 'center',
    marginTop: 10,
  },

  actions: {
    fontFamily: 'poppins-medium',
    fontSize: 16,
    lineHeight: 32,
  },

  button: {
    height: 50,
    width: 180,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',

    //
    alignSelf: 'left',
  },

  title: {
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: Colors.dark4,
    marginLeft: 10,
  },
});

export default CustomDrawer;
