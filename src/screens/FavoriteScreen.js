// FavoriteScreen.js
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/theme';

const FavoriteScreen = () => {
  const favorites = useSelector(state => state.favorites.favorites);
  const navigation = useNavigation();

  const handleCityPress = (city) => {
    navigation.navigate('Home', { city });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cities</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCityPress(item)} style={styles.listItem}>
            <Text style={styles.cityName}>{item}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorites added yet!</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.darkBackground,
  },
  listItem: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  cityName: {
    fontSize: 18,
    color: colors.darkBackground,
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: colors.white,
    fontWeight : 'bold'
  },
});
