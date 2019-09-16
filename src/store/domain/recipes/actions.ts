import { RecipeActionTypes, GetRecipesApiRequest, PostRecipeApiRequest, PendingRecipesApiRequest, RecipesSuccessApiResponse, RecipesFailureApiResponse } from './types';

export const getRecipesRequest = (): GetRecipesApiRequest => ({
    type: RecipeActionTypes.GET_RECIPES_REQUEST
});

//TODO: remove all pending
export const pendingGetRecipesRequest = (): PendingRecipesApiRequest => ({
    type: RecipeActionTypes.GET_RECIPES_REQUEST_PENDING
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

export const pendingPostRecipesRequest = (): PendingRecipesApiRequest => ({
    type: RecipeActionTypes.POST_RECIPES_REQUEST_PENDING
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