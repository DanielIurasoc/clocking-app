import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ThemeContext } from './ThemeContext';
import Colors from '../../constants/Colors';

const CommentCard = ({ user, date, content }) => {
  // color context
  const { theme } = useContext(ThemeContext);
  const styles = myStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.comment}>
        <View style={styles.header}>
          <Text style={styles.user}> {user} </Text>
          <Text style={styles.date}> {date} </Text>
        </View>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const myStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    comment: {
      margin: 10,
      // marginBottom: 10,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: theme.dark2,
      paddingHorizontal: 20,
      paddingVertical: 10,
      elevation: 8,
    },

    header: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    user: {
      fontFamily: 'poppins-medium',
    },

    date: {
      fontFamily: 'poppins-regular',
    },

    content: {
      fontFamily: 'poppins-regular',
      fontSize: 16,
      alignSelf: 'flex-start',
    },
  });

export default CommentCard;
