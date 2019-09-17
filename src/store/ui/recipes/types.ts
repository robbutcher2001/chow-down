import { Action } from 'redux';

export enum RecipeUiActionTypes {
    GET_RECIPES_PENDING = '@@recipes/GET_PENDING',
    POST_RECIPES_PENDING = '@@recipes/POST_PENDING',
    CLEAR_GET_RECIPES_PENDING = '@@recipes/CLEAR_ET_PENDING',
    CLEAR_POST_RECIPES_PENDING = '@@recipes/CLEAR_POST_PENDING'
}

export interface RecipesUiState {
    readonly getPending: boolean,
    readonly postPending: boolean
}

export interface RecipesUiChange extends Action {
    type: RecipeUiActionTypes
}