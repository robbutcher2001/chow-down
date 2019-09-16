import { Action } from 'redux';

export enum IngredientActionTypes {
    GET_INGREDIENTS_PENDING = '@@ingredients/GET_PENDING',
    POST_INGREDIENTS_PENDING = '@@ingredients/POST_PENDING',
    CLEAR_GET_INGREDIENTS_PENDING = '@@ingredients/CLEAR_ET_PENDING',
    CLEAR_POST_INGREDIENTS_PENDING = '@@ingredients/CLEAR_POST_PENDING'
}

export interface IngredientsUiState {
    readonly getPending: boolean,
    readonly postPending: boolean
}

export interface IngredientsUiChange extends Action {
    type: IngredientActionTypes
}