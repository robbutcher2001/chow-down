import { Action } from 'redux';
import { Searchable } from '..';
import { Tag } from '../tags/types';

export enum RecipeActionTypes {
    GET_RECIPES_REQUEST = '@@recipes/GET_REQUEST',
    GET_RECIPES_SUCCESS = '@@recipes/GET_SUCCESS',
    GET_RECIPES_FAILURE = '@@recipes/GET_FAILURE',
    POST_RECIPE_REQUEST = '@@recipes/POST_REQUEST',
    POST_RECIPE_SUCCESS = '@@recipes/POST_SUCCESS',
    POST_RECIPE_FAILURE = '@@recipes/POST_FAILURE',
    PUT_RECIPE_UPDATE_TAG_REQUEST = '@@recipes/PUT_UPDATE_TAG_REQUEST',
    PUT_RECIPE_UPDATE_TAG_QUEUE_REQUEST = '@@recipes/PUT_UPDATE_TAG_QUEUE_REQUEST',
    PUT_RECIPE_UPDATE_TAG_SUCCESS = '@@recipes/PUT_UPDATE_TAG_SUCCESS',
    PUT_RECIPE_UPDATE_TAG_FAILURE = '@@recipes/PUT_UPDATE_TAG_FAILURE',
    CLEAR_RECIPE_UPDATE_TAG_FAILURE = '@@recipes/CLEAR_UPDATE_TAG_FAILURE'
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
    readonly updateRecipeTagFailures: string[]
    readonly recipes: Recipe[]
}

export interface GetRecipesApiRequest extends Action {
    type: RecipeActionTypes
}

export interface PostRecipeApiRequest extends Action {
    type: RecipeActionTypes,
    recipe: Recipe
}

export interface PutRecipeUpdateTagApiRequest extends Action {
  type: RecipeActionTypes,
  recipe: Recipe,
  updatedTagId: string
}

export interface GetRecipesSuccessApiResponse extends Action {
  type: RecipeActionTypes,
  recipes: Recipe[]
}

export interface PostRecipeSuccessApiResponse extends Action {
    type: RecipeActionTypes,
    recipe: Recipe
}

export interface RecipesFailureApiResponse extends Action {
    type: RecipeActionTypes,
    code: number,
    json: object
}

export interface PutRecipeUpdateTagSuccessApiResponse extends Action {
  type: RecipeActionTypes,
  recipe: Recipe,
  updateRecipeTagId: string
}

export interface PutRecipeUpdateTagFailureApiResponse extends Action {
  type: RecipeActionTypes,
  code: number,
  updateRecipeTagFailureId: string,
  json: object
}

export interface ClearRecipeUpdateTagFailureApiResponse extends Action {
  type: RecipeActionTypes,
  updateRecipeTagFailedId: string,
}

export type GetRecipesApiResponse = GetRecipesSuccessApiResponse | PostRecipeSuccessApiResponse | RecipesFailureApiResponse | PutRecipeUpdateTagSuccessApiResponse | PutRecipeUpdateTagFailureApiResponse | ClearRecipeUpdateTagFailureApiResponse;