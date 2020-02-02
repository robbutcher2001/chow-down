import { Action } from 'redux';

export enum IngredientActionTypes {
    GET_INGREDIENTS_REQUEST = '@@ingredients/GET_REQUEST',
    GET_INGREDIENTS_SUCCESS = '@@ingredients/GET_SUCCESS',
    GET_INGREDIENTS_FAILURE = '@@ingredients/GET_FAILURE',
    POST_INGREDIENTS_REQUEST = '@@ingredients/POST_REQUEST',
    POST_INGREDIENTS_SUCCESS = '@@ingredients/POST_SUCCESS',
    POST_INGREDIENTS_FAILURE = '@@ingredients/POST_FAILURE'
}

export interface Ingredient {
    id: string,
    ingredient: string
}

export interface IngredientsState {
    readonly failure: string,
    readonly ingredients: Ingredient[]
}

export interface GetIngredientsApiRequest extends Action {
    type: IngredientActionTypes
}

export interface PostIngredientApiRequest extends Action {
    type: IngredientActionTypes,
    ingredient: Ingredient
}

export interface IngredientsSuccessApiResponse extends Action {
    type: IngredientActionTypes,
    ingredients: Ingredient[]
}

export interface IngredientsFailureApiResponse extends Action {
    type: IngredientActionTypes,
    code: number,
    json: object
}

export type GetIngredientsApiResponse = IngredientsSuccessApiResponse | IngredientsFailureApiResponse;