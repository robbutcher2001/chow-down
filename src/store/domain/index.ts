import { combineReducers } from 'redux';

import { IngredientsState } from './ingredients/types';

import { ingredientsReducer } from './ingredients/reducer';

export interface DomainState {
    ingredient: IngredientsState
}

export const createDomainReducer = () => combineReducers<DomainState>({
    ingredient: ingredientsReducer
});