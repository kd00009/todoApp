// LeadsCard.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../constants/theme';

const LeadsCard = ({name, type, status, number, id}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.id}>{id}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.number}>{number}</Text>
      </View>
      <Text style={styles.type}>{type}</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card_bg,
    padding: 16,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    marginVertical: 10,
    width: '100%',
  },
  id: {
    fontWeight: 'bold',
    color: colors.textColor,
    fontSize: 16,
    flex: 0.3,
  },
  infoContainer: {
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  name: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: colors.textColor,
    fontSize: 18,
    marginBottom: 4,
  },
  number: {
    textAlign: 'left',
    color: colors.textColor,
    fontSize: 15,
  },
  type: {
    textAlign: 'center',
    color: colors.textColor,
    fontWeight: '500',
    fontSize: 15,
    flex: 0.7,
  },
  status: {
    textAlign: 'right',
    color: colors.textColor,
    fontWeight: '500',
    fontSize: 15,
    flex: 0.8,
  },
});

export default LeadsCard;
