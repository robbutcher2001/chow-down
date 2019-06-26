import { combineReducers } from 'redux';

import GetIngredientsReducer from './getIngredientsReducer';
import GetRecipesReducer from './getRecipesReducer';

export default combineReducers({
    ingredients: GetIngredientsReducer,
    recipes: GetRecipesReducer
});