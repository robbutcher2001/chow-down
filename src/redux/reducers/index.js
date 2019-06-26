import { combineReducers } from 'redux';

import IngredientsReducer from './ingredientsReducer';
import GetRecipesReducer from './getRecipesReducer';

export default combineReducers({
    ingredients: IngredientsReducer,
    recipes: GetRecipesReducer
});