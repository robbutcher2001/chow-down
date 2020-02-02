import { Recipe, RecipeActionTypes, GetRecipesApiRequest, PostRecipeApiRequest, RecipesSuccessApiResponse, RecipesFailureApiResponse } from './types';

export const getRecipesRequest = (): GetRecipesApiRequest => ({
    type: RecipeActionTypes.GET_RECIPES_REQUEST
});

export const getRecipesSuccess = (recipes: Recipe[]): RecipesSuccessApiResponse => ({
    type: RecipeActionTypes.GET_RECIPES_SUCCESS,
    recipes
});

export const getRecipesFailure = (code: number, json: object): RecipesFailureApiResponse => ({
    type: RecipeActionTypes.GET_RECIPES_FAILURE,
    code,
    json
});

export const postRecipesRequest = (recipe: Recipe): PostRecipeApiRequest => ({
    type: RecipeActionTypes.POST_RECIPES_REQUEST,
    recipe
});

export const postRecipesSuccess = (recipes: Recipe[]): RecipesSuccessApiResponse => ({
    type: RecipeActionTypes.POST_RECIPES_SUCCESS,
    recipes
});

export const postRecipesFailure = (code: number, json: object): RecipesFailureApiResponse => ({
    type: RecipeActionTypes.POST_RECIPES_FAILURE,
    code,
    json
});