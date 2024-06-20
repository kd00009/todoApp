// MeetingCard.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../constants/theme';

const MeetingCard = ({name, flat, date, lname}) => {
  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lname}>{lname}</Text>
      </View>
      <Text style={styles.flat}>{flat}</Text>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.scheduled}>{'scheduled'}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card_bg,
    padding: 20,
    borderRadius: 10,
    borderColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 10,
    width: '100%',
    borderWidth: 1,
  },
  name: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: colors.textColor,
    fontSize: 18,
  },
  flat: {
    flex: 1,
    textAlign: 'center',
    color: colors.textColor,
    fontWeight: '500',
    fontSize: 16,
  },
  date: {
    textAlign: 'center',
    color: colors.textColor,
    fontWeight: '400',
    fontSize: 15,
  },
  scheduled: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.textColor,
  },
  lname: {
    flex: 1,
    textAlign: 'center',
    color: colors.textColor,
    fontWeight: '400',
    fontSize: 15,
  },
});

export default MeetingCard;
