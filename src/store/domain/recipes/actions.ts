import { RecipeActionTypes, GetRecipesApiRequest, PostRecipeApiRequest, PendingRecipesApiRequest, RecipesSuccessApiResponse, RecipesFailureApiResponse } from './types';

export const getRecipesRequest = (): GetRecipesApiRequest => ({
    type: RecipeActionTypes.GET_RECIPES_REQUEST
});

export const pendingGetRecipesRequest = (): PendingRecipesApiRequest => ({
    type: RecipeActionTypes.GET_RECIPES_REQUEST_PENDING
});

export const getRecipesSuccess = (json: object): RecipesSuccessApiResponse => ({
    type: RecipeActionTypes.GET_RECIPES_SUCCESS,
    json
});

export const getRecipesFailure = (reason: string): RecipesFailureApiResponse => ({
    type: RecipeActionTypes.GET_RECIPES_FAILURE,
    reason
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

export const postRecipesFailure = (reason: string): RecipesFailureApiResponse => ({
    type: RecipeActionTypes.POST_RECIPES_FAILURE,
    reason
});