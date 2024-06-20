// RecipeCard.js
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {FAV_ACTIVE, REMOVE} from '../constants/svg';
import { colors } from '../constants/theme';

const RecipeCard = ({item, onPress, isFav, onRemove}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: item.strMealThumb}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.strMeal}</Text>
        <Text style={styles.category}>{item.strCategory}</Text>
      </View>
      {isFav && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <SvgXml xml={REMOVE} width={30} height={30} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 15,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '700',
  },
});

export default React.memo(RecipeCard);
