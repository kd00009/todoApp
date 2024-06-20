// Card.js
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../constants/theme';

const Card = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
    card: {
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
    cardText: {
      fontSize: 18,
      color : colors.textColor,
      fontWeight : 'bold'
    },
  });
