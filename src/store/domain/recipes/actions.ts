import { RecipeActionTypes, GetRecipesApiRequest, PostRecipeApiRequest, RecipesSuccessApiResponse, RecipesFailureApiResponse } from './types';

export const getRecipesRequest = (): GetRecipesApiRequest => ({
    type: RecipeActionTypes.GET_RECIPES_REQUEST
});

export const getRecipesSuccess = (json: object): RecipesSuccessApiResponse => ({
    type: RecipeActionTypes.GET_RECIPES_SUCCESS,
    json
});

export const getRecipesFailure = (code: number, json: object): RecipesFailureApiResponse => ({
    type: RecipeActionTypes.GET_RECIPES_FAILURE,
    code,
    json
});

export const postRecipesRequest = (payload: object): PostRecipeApiRequest => ({
    type: RecipeActionTypes.POST_RECIPES_REQUEST,
    payload
});

export const postRecipesSuccess = (json: object): RecipesSuccessApiResponse => ({
    type: RecipeActionTypes.POST_RECIPES_SUCCESS,
    json
});

export const postRecipesFailure = (code: number, json: object): RecipesFailureApiResponse => ({
    type: RecipeActionTypes.POST_RECIPES_FAILURE,
    code,
    json
});