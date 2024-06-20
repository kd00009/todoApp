import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SvgXml} from 'react-native-svg';
import {ADD_FAV, REMOVE} from '../constants/svg';

const RecipeDetailScreen = ({route, navigation}) => {
  const {recipe} = route?.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesChanged, setFavoritesChanged] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        const favorites = jsonValue ? JSON.parse(jsonValue) : [];
        const isFav = favorites.some(fav => fav.idMeal === recipe.idMeal);
        setIsFavorite(isFav);
      } catch (e) {
        console.error('Error checking if recipe is favorite', e);
      }
    };

    checkIfFavorite();
  }, [recipe.idMeal, favoritesChanged]);

  const addToFav = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      let favorites = jsonValue ? JSON.parse(jsonValue) : [];

      const isAlreadyFavorite = favorites.some(
        fav => fav.idMeal === recipe.idMeal,
      );
      if (isAlreadyFavorite) {
        Alert.alert(
          'Already Added',
          'This recipe is already in your favorites.',
        );
        return;
      }

      favorites.push(recipe);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));

      setIsFavorite(true);
      setFavoritesChanged(prev => !prev);

      Alert.alert('Success', 'Recipe added to favorites!');
    } catch (e) {
      console.error('Error saving recipe to favorites', e);
      Alert.alert('Error', 'Failed to add recipe to favorites.');
    }
  };

  const removeFromFav = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      let favorites = jsonValue ? JSON.parse(jsonValue) : [];

      favorites = favorites.filter(fav => fav.idMeal !== recipe.idMeal);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));

      setIsFavorite(false);
      setFavoritesChanged(prev => !prev);

      Alert.alert('Success', 'Recipe removed from favorites!');
    } catch (e) {
      console.error('Error removing recipe from favorites', e);
      Alert.alert('Error', 'Failed to remove recipe from favorites.');
    }
  };

  return (
    <>
      <Header title={recipe.strMeal} isFav={true} />
      <Image source={{uri: recipe.strMealThumb}} style={styles.image} />
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{recipe.strMeal}</Text>
          <TouchableOpacity onPress={isFavorite ? removeFromFav : addToFav}>
            {isFavorite ? (
              <SvgXml xml={REMOVE} width={30} height={30} />
            ) : (
              <SvgXml xml={ADD_FAV} width={30} height={30} />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.category}>Category: {recipe.strCategory}</Text>
        <Text style={styles.instructions}>{recipe.strInstructions}</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  category: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 16,
    color: '#555',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
    color: '#666',
  },
  favButtonAdd: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  favButtonRemove: {
    padding: 10,
    backgroundColor: '#FF5722',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeDetailScreen;
