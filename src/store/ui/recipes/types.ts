import { Action } from 'redux';

export enum RecipeUiActionTypes {
    GET_RECIPES_PENDING = '@@recipes/GET_PENDING',
    POST_RECIPES_PENDING = '@@recipes/POST_PENDING',
    PUT_RECIPES_PENDING = '@@recipes/PUT_PENDING',
    CLEAR_GET_RECIPES_PENDING = '@@recipes/CLEAR_GET_PENDING',
    CLEAR_POST_RECIPES_PENDING = '@@recipes/CLEAR_POST_PENDING',
    CLEAR_PUT_RECIPES_PENDING = '@@recipes/CLEAR_PUT_PENDING'
}

export interface RecipesUiState {
    readonly getPending: boolean,
    readonly postPending: boolean,
    readonly putPending: boolean
}

export interface RecipesUiChange extends Action {
    type: RecipeUiActionTypes
}