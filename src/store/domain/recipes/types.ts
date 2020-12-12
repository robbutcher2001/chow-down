import { Action } from 'redux';
import { Searchable } from '..';
import { Tag } from '../tags/types';

export enum RecipeActionTypes {
    GET_RECIPES_REQUEST = '@@recipes/GET_REQUEST',
    GET_RECIPES_SUCCESS = '@@recipes/GET_SUCCESS',
    GET_RECIPES_FAILURE = '@@recipes/GET_FAILURE',
    POST_RECIPES_REQUEST = '@@recipes/POST_REQUEST',
    POST_RECIPES_SUCCESS = '@@recipes/POST_SUCCESS',
    POST_RECIPES_FAILURE = '@@recipes/POST_FAILURE',
    PUT_RECIPE_UPDATE_REQUEST = '@@recipes/PUT_UPDATE_REQUEST',
    PUT_RECIPE_UPDATE_SUCCESS = '@@recipes/PUT_UPDATE_SUCCESS',
    PUT_RECIPE_UPDATE_FAILURE = '@@recipes/PUT_UPDATE_FAILURE'
}

// TODO: make like Swagger and have a model extending a base model but changing optionality?
export interface Recipe extends Searchable {
    id?: string,
    title?: string,
    description?: string,
    rating?: number,
    url?: string,
    image?: string,
    tags?: Tag[],
    createdDate?: string
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
    recipe: Recipe
}

export interface PutRecipeUpdateApiRequest extends Action {
  type: RecipeActionTypes,
  recipe: Recipe
}

// TODO: maybe have a separate interface for POST success as it doesn't return an array of recipes, only the new one
export interface RecipesSuccessApiResponse extends Action {
    type: RecipeActionTypes,
    recipes: Recipe[]
}

export interface RecipesFailureApiResponse extends Action {
    type: RecipeActionTypes,
    code: number,
    json: object
}

export type GetRecipesApiResponse = RecipesSuccessApiResponse | RecipesFailureApiResponse;