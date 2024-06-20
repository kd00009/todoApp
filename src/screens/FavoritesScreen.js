// FavoritesScreen.js
import React, {useState, useEffect} from 'react';
import {View, FlatList, Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import RecipeCard from '../components/Card';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        setFavorites(jsonValue != null ? JSON.parse(jsonValue) : []);
      } catch (e) {
        console.error('Error fetching favorites', e);
        Alert.alert('Error', 'Failed to fetch favorites.');
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchFavorites);
    return unsubscribe;
  }, [navigation]);

  const removeFavorite = async idMeal => {
    const updatedFavorites = favorites.filter(item => item.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (e) {
      console.error('Error removing favorite', e);
      Alert.alert('Error', 'Failed to remove favorite.');
    }
  };

  return (
    <>
      <Header title="Favorite Recipes" />
      <View style={{padding: 16, marginBottom: 40}}>
        <FlatList
          ListEmptyComponent={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18}}>No favorites added yet.</Text>
            </View>
          }
          data={favorites}
          keyExtractor={item => item.idMeal.toString()}
          renderItem={({item}) => (
            <RecipeCard
              isFav={true}
              item={item}
              onPress={() =>
                navigation.navigate('RecipeDetail', {recipe: item})
              }
              onRemove={() => removeFavorite(item.idMeal)}
            />
          )}
        />
      </View>
    </>
  );
};

export default FavoritesScreen;
