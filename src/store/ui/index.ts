import { combineReducers } from 'redux';

import { IngredientsUiState } from './ingredients/types';
import { RecipesUiState } from './recipes/types';
import { UnitsUiState } from './units/types';
import { DaysUiState } from './days/types';
import { TagsUiState } from './tags/types';

import { ingredientsUiReducer } from './ingredients/reducer';
import { recipesUiReducer } from './recipes/reducer';
import { unitsUiReducer } from './units/reducer';
import { daysUiReducer } from './days/reducer';
import { tagsUiReducer } from './tags/reducer';

export interface UiState {
  ingredient: IngredientsUiState,
  recipe: RecipesUiState,
  unit: UnitsUiState,
  day: DaysUiState,
  tag: TagsUiState
}

export const createUiReducer = () => combineReducers<UiState>({
  ingredient: ingredientsUiReducer,
  recipe: recipesUiReducer,
  unit: unitsUiReducer,
  day: daysUiReducer,
  tag: tagsUiReducer
});