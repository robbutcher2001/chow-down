import { combineReducers } from 'redux';

import { IngredientsState } from './ingredients/types';
import { RecipesState } from './recipes/types';
import { UnitsState } from './units/types';
import { DaysState } from './days/types';

import { ingredientsReducer } from './ingredients/reducer';
import { recipesReducer } from './recipes/reducer';
import { unitsReducer } from './units/reducer';
import { daysReducer } from './days/reducer';

export interface Searchable {
  getSearchableKeywords(): string[]
}

export interface DomainState {
    ingredient: IngredientsState,
    recipe: RecipesState,
    unit: UnitsState,
    day: DaysState
}

export const createDomainReducer = () => combineReducers<DomainState>({
    ingredient: ingredientsReducer,
    recipe: recipesReducer,
    unit: unitsReducer,
    day: daysReducer
});