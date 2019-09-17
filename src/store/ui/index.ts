import { combineReducers } from 'redux';

import { IngredientsUiState } from './ingredients/types';
import { RecipesUiState } from './recipes/types';
import { UnitsUiState } from './units/types';

import { ingredientsUiReducer } from './ingredients/reducer';
import { recipesUiReducer } from './recipes/reducer';
import { unitsUiReducer } from './units/reducer';

export interface UiState {
    ingredient: IngredientsUiState,
    recipe: RecipesUiState,
    unit: UnitsUiState
}

export const createUiReducer = () => combineReducers<UiState>({
    ingredient: ingredientsUiReducer,
    recipe: recipesUiReducer,
    unit: unitsUiReducer
});