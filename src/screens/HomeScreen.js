import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import RecipeCard from '../components/Card';
import {colors} from '../constants/theme';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('a');

  useEffect(() => {
    fetchRecipes(currentLetter);
  }, [currentLetter]);

  const fetchRecipes = async (letter) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
      );
      setRecipes(prevRecipes => [...prevRecipes, ...response.data.meals]);
      setFilteredRecipes(prevFiltered => [...prevFiltered, ...response.data.meals]);
    } catch (error) {
     Alert('Error fetching recipes', error);
     console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = text => {
    setSearch(text);
    const filtered = recipes.filter(
      recipe =>
        recipe.strMeal.toLowerCase().includes(text.toLowerCase()) ||
        recipe.strIngredient1.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredRecipes(filtered);
  };

  const loadMoreRecipes = () => {
    if (!loading) {
      const nextLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
      if (nextLetter <= 'z') {
        setCurrentLetter(nextLetter);
      }
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="The Recipe App"
        isMainScreen={true}
        backgroundColor={colors.primary}
      />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor={colors.header_bg}
          value={search}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.idMeal}
          renderItem={({item}) => (
            <RecipeCard
              item={item}
              onPress={() => navigation.navigate('RecipeDetail', {recipe: item})}
            />
          )}
          contentContainerStyle={styles.flatListContent}
          onEndReached={loadMoreRecipes}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading && <ActivityIndicator size="large" style={{marginVertical: 16}} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.header_bg,
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 16,
  },
});
