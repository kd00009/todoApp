// src/actions/cityActions.js
import axios from 'axios';

export const fetchCitySuggestionsRequest = () => ({
    type: 'FETCH_CITY_SUGGESTIONS_REQUEST',
});

export const fetchCitySuggestionsSuccess = (data) => ({
    type: 'FETCH_CITY_SUGGESTIONS_SUCCESS',
    payload: data,
});

export const fetchCitySuggestionsFailure = (error) => ({
    type: 'FETCH_CITY_SUGGESTIONS_FAILURE',
    payload: error,
});

export const fetchCitySuggestions = (query) => async (dispatch) => {
    dispatch(fetchCitySuggestionsRequest());
    try {
        const apiKey = 'e7ba4d567bf8ea456e485d7e8e115550';  // Replace with your actual API key
        const response = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${apiKey}`
        );
        dispatch(fetchCitySuggestionsSuccess(response.data));
    } catch (error) {
        dispatch(fetchCitySuggestionsFailure(error.message));
    }
};
