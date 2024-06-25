// Cards.js
import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

const Cards = ({name, image, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    marginTop: 5,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight : 'bold'
  },
});

export default Cards;
