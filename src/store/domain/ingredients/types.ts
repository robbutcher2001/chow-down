import { Action } from 'redux';

export enum IngredientActionTypes {
    GET_INGREDIENTS_REQUEST = '@@ingredients/GET_REQUEST',
    GET_INGREDIENTS_REQUEST_PENDING = '@@ingredients/GET_REQUEST_PENDING',
    GET_INGREDIENTS_SUCCESS = '@@ingredients/GET_SUCCESS',
    GET_INGREDIENTS_FAILURE = '@@ingredients/GET_FAILURE',
    POST_INGREDIENTS_REQUEST = '@@ingredients/POST_REQUEST',
    POST_INGREDIENTS_REQUEST_PENDING = '@@ingredients/POST_REQUEST_PENDING',
    POST_INGREDIENTS_SUCCESS = '@@ingredients/POST_SUCCESS',
    POST_INGREDIENTS_FAILURE = '@@ingredients/POST_FAILURE'
}

export interface Ingredient {
    id: string,
    name: string
}

export interface IngredientsState {
    readonly error: string,
    readonly ingredients: Ingredient[]
}

export interface GetIngredientsApiRequest extends Action {
    type: IngredientActionTypes
}

export interface PostIngredientApiRequest extends Action {
    type: IngredientActionTypes,
    payload: object
}

export interface PendingIngredientsApiRequest extends Action {
    type: IngredientActionTypes
}

export interface IngredientsSuccessApiResponse extends Action {
    type: IngredientActionTypes,
    json: object
}

export interface IngredientsFailureApiResponse extends Action {
    type: IngredientActionTypes,
    reason: string
}

export type GetIngredientsApiResponse = IngredientsSuccessApiResponse | IngredientsFailureApiResponse;