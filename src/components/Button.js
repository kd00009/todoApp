import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { colors } from '../constants/theme';

const Button = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: colors.primaryText,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Button;
