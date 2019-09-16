import { Action } from 'redux';

export enum RecipeActionTypes {
    GET_RECIPES_REQUEST = '@@recipes/GET_REQUEST',
    GET_RECIPES_REQUEST_PENDING = '@@recipes/GET_REQUEST_PENDING',
    GET_RECIPES_SUCCESS = '@@recipes/GET_SUCCESS',
    GET_RECIPES_FAILURE = '@@recipes/GET_FAILURE',
    POST_RECIPES_REQUEST = '@@recipes/POST_REQUEST',
    POST_RECIPES_REQUEST_PENDING = '@@recipes/POST_REQUEST_PENDING',
    POST_RECIPES_SUCCESS = '@@recipes/POST_SUCCESS',
    POST_RECIPES_FAILURE = '@@recipes/POST_FAILURE'
}

export interface Recipe {
    id: string,
    title: string,
    url: string,
    description: string,
    image: string
}

export interface RecipesState {
    readonly failure: string,
    readonly recipes: Recipe[]
}

export interface GetRecipesApiRequest extends Action {
    type: RecipeActionTypes
}

export interface PostRecipeApiRequest extends Action {
    type: RecipeActionTypes,
    payload: object
}

export interface PendingRecipesApiRequest extends Action {
    type: RecipeActionTypes
}

export interface RecipesSuccessApiResponse extends Action {
    type: RecipeActionTypes,
    json: object
}

export interface RecipesFailureApiResponse extends Action {
    type: RecipeActionTypes,
    code: number,
    json: object
}

export type GetRecipesApiResponse = RecipesSuccessApiResponse | RecipesFailureApiResponse;