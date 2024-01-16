import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomText from '../../components/CustomText.js';
import commonStyles from '../../components/commonStyles.js';
import Colors from '../../constants/Colors.js';
import TimeCard from '../../components/UI/TimeCard.js';

const DetailsScreen = (props) => {
  const { title, id } = props.route.params ?? {};

  // disable and hide bottom navigation on this screen
  useEffect(() => {
    // disable the drawer on this screen
    props.navigation.getParent().getParent()?.setOptions({
      swipeEdgeWidth: 0,
    });

    return () => {
      // reactivate the drawer too
      props.navigation.getParent().getParent()?.setOptions({
        swipeEdgeWidth: 25,
      });
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text> tbd</Text>
      </View>
      <View style={styles.hoursContainer}>
        <TimeCard color="green" label="Start Time" content="08 : 00" />
        <TimeCard color="yellow" label="Pause" content="00 : 30" />
        <TimeCard color="red" label="End Time" content="17 : 30" />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}> Description </Text>
        <Text style={styles.description}>
          I did good work boss. Give me raise plspls!
        </Text>
      </View>
      <View style={styles.photosContainer}>
        <Text style={styles.title}> Photos </Text>
        <View style={styles.photos}>
          <View style={styles.photo} />
          <View style={styles.photo} />
          <View style={styles.photo} />
        </View>
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.title}> Comments </Text>
        <View style={styles.comment}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentName}> Name </Text>
            <Text style={styles.commentDate}> 13.01.2023, 18:31 </Text>
          </View>
          <Text style={styles.commentText}>
            Content here, where is the content???
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  statusContainer: {
    width: '90%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hoursContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  descriptionContainer: {
    width: '90%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'poppins-regular',
    fontSize: 16,
    paddingBottom: 4,
  },

  description: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
  },

  photosContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.dark2,
    paddingTop: 5,
    paddingBottom: 15,
  },

  photos: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  photo: {
    height: 75,
    width: 75,
    borderRadius: 20,
    backgroundColor: Colors.dark3,
  },

  commentsContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  comment: {
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.dark2,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  commentHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DetailsScreen;
