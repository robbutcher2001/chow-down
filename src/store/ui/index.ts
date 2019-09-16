import { combineReducers } from 'redux';

import { IngredientsUiState } from './ingredients/types';

import { ingredientsUiReducer } from './ingredients/reducer';

export interface UiState {
    ingredient: IngredientsUiState
}

export const createUiReducer = () => combineReducers<UiState>({
    ingredient: ingredientsUiReducer
});