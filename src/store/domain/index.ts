import { combineReducers } from 'redux';

import { IngredientsState } from './ingredients/types';
import { RecipesState } from './recipes/types';

import { ingredientsReducer } from './ingredients/reducer';
import { recipesReducer } from './recipes/reducer';

export interface DomainState {
    ingredient: IngredientsState,
    recipe: RecipesState
}

export const createDomainReducer = () => combineReducers<DomainState>({
    ingredient: ingredientsReducer,
    recipe: recipesReducer
});