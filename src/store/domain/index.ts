import { combineReducers } from 'redux';

import { IngredientsState } from './ingredients/types';
import { RecipesState } from './recipes/types';
import { UnitsState } from './units/types';

import { ingredientsReducer } from './ingredients/reducer';
import { recipesReducer } from './recipes/reducer';
import { unitsReducer } from './units/reducer';

export interface DomainState {
    ingredient: IngredientsState,
    recipe: RecipesState,
    unit: UnitsState
}

export const createDomainReducer = () => combineReducers<DomainState>({
    ingredient: ingredientsReducer,
    recipe: recipesReducer,
    unit: unitsReducer
});