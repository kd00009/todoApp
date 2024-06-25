import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Weather from '../components/Weather';
import { fetchWeather } from '../redux/action/weatherActions';
import { deviceHeight, deviceWidth } from '../utils/dimensions';
import Cards from '../components/Cards';
import { useRoute } from '@react-navigation/native';
import { cities } from '../constants/data';
import { colors } from '../constants/theme';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather.weather);
  const loading = useSelector(state => state.weather.loading);

  const route = useRoute();

  useEffect(() => {
    if (route.params?.city) {
      setCity(route.params.city);
      handleFetchWeather(route.params.city);
    }
  }, [route.params]);

  const handleFetchWeather = cityName => {
    dispatch(fetchWeather(cityName || city));
  };

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/image2.jpg')}
        style={{ height: deviceHeight, width: deviceWidth }}
        imageStyle={{ opacity: 0.6, backgroundColor: 'black' }}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Search the city by the name</Text>
        <TextInput
          placeholderTextColor="white"
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleFetchWeather()}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        {loading && (
          <ActivityIndicator
            style={styles.loadingText}
            size="large"
            color="#007BFF"
          />
        )}

        <Weather weather={weather} />

        <Text style={styles.topCitiesTitle}>Top Cities</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={cities}
          renderItem={({ item }) => (
            <Cards
              name={item.name}
              image={item.image}
              onPress={() => handleFetchWeather(item.name)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'white',
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 5,
    width: 80,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 20,
  },
  topCitiesTitle: {
    color: colors.white,
    fontSize: 25,
    paddingHorizontal: 10,
    marginBottom: 40,
    paddingTop: 50,
  },
});

export default HomeScreen;
