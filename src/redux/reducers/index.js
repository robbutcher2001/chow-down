import { combineReducers } from 'redux';

import UnitsReducer from './unitsReducer';
import IngredientsReducer from './ingredientsReducer';
import RecipesReducer from './recipesReducer';

export default combineReducers({
    units: UnitsReducer,
    ingredients: IngredientsReducer,
    recipes: RecipesReducer
});