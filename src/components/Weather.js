import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites, removeFromFavorites} from '../redux/action/FavAction';
import {SvgXml} from 'react-native-svg';
import {FAV, FAV_ACTIVE} from '../constants/svg';

const Weather = ({weather}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  if (!weather) return null;

  const isFavorite = favorites.includes(weather.name);

  const handleFavoritePress = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(weather.name));
    } else {
      dispatch(addToFavorites(weather.name));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFavoritePress} style={styles.button}>
        <SvgXml
          xml={isFavorite ? FAV_ACTIVE : FAV}
          height={50}
          width={40}
        />
      </TouchableOpacity>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  flex : 1
   
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  temp: {
    fontSize: 28,
    marginVertical: 10,
    color: 'white',
  },
  description: {
    fontSize: 22,
    color: 'white',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 20,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Weather;
