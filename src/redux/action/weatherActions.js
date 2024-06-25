// src/actions/weatherActions.js
import axios, {all} from 'axios';
import {Alert} from 'react-native';
import { ApiKey } from '../../constants/data';

export const fetchWeatherRequest = () => ({
  type: 'FETCH_WEATHER_REQUEST',
});

export const fetchWeatherSuccess = data => ({
  type: 'FETCH_WEATHER_SUCCESS',
  payload: data,
});

export const fetchWeatherFailure = error => ({
  type: 'FETCH_WEATHER_FAILURE',
  payload: error,
});

export const fetchWeather = city => async dispatch => {
  dispatch(fetchWeatherRequest());
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`,
    );
    dispatch(fetchWeatherSuccess(response.data));
  } catch (error) {
    Alert.alert('Error', 'please enter a valid city or try again  ');
    dispatch(fetchWeatherFailure(error.message));
  }
};
