'use strict';

import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import unitsReducer from './unitsReducer';
import ingredientsReducer from './ingredientsReducer';
import recipesReducer from './recipesReducer';

export default combineReducers({
    error: errorReducer,
    units: unitsReducer,
    ingredients: ingredientsReducer,
    recipes: recipesReducer
});