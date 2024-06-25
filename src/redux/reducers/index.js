// src/reducers/index.js
import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import favoriteReducer from './FavReducer';

const rootReducer = combineReducers({
    weather: weatherReducer,
    favorites: favoriteReducer,
});

export default rootReducer;
