// src/reducers/weatherReducer.js
const initialState = {
    loading: false,
    weather: null,
    error: null,
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WEATHER_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_WEATHER_SUCCESS':
            return { ...state, loading: false, weather: action.payload };
        case 'FETCH_WEATHER_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default weatherReducer;
