import { Action } from 'redux';

export enum RecipeUiActionTypes {
    GET_RECIPES_PENDING = '@@recipes/GET_PENDING',
    POST_RECIPE_PENDING = '@@recipes/POST_PENDING',
    PUT_RECIPE_TAG_PENDING = '@@recipes/PUT_TAG_PENDING',
    CLEAR_GET_RECIPES_PENDING = '@@recipes/CLEAR_GET_PENDING',
    CLEAR_POST_RECIPE_PENDING = '@@recipes/CLEAR_POST_PENDING',
    CLEAR_PUT_RECIPE_TAG_PENDING = '@@recipes/CLEAR_PUT_TAG_PENDING'
}

export interface RecipesUiState {
    readonly getPending: boolean,
    readonly postPending: boolean,
    readonly putPending: string[]
}

export interface RecipesUiChange extends Action {
    type: RecipeUiActionTypes
}

export interface UpdateRecipeTagUiChange extends Action {
    type: RecipeUiActionTypes,
    updatedTagId: string
}

export type AnyRecipeUiChange = RecipesUiChange | UpdateRecipeTagUiChange;