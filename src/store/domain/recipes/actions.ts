import {
  Recipe,
  RecipeActionTypes,
  GetRecipesApiRequest,
  PostRecipeApiRequest,
  PutRecipeUpdateTagApiRequest,
  GetRecipesSuccessApiResponse,
  PostRecipeSuccessApiResponse,
  RecipesFailureApiResponse,
  PutRecipeUpdateTagSuccessApiResponse,
  PutRecipeUpdateTagFailureApiResponse,
  ClearRecipeUpdateTagFailureApiResponse
} from './types';

export const getRecipesRequest = (): GetRecipesApiRequest => ({
    type: RecipeActionTypes.GET_RECIPES_REQUEST
});

export const getRecipesSuccess = (recipes: Recipe[]): GetRecipesSuccessApiResponse => ({
    type: RecipeActionTypes.GET_RECIPES_SUCCESS,
    recipes
});

export const getRecipesFailure = (code: number, json: object): RecipesFailureApiResponse => ({
    type: RecipeActionTypes.GET_RECIPES_FAILURE,
    code,
    json
});

export const postRecipeRequest = (recipe: Recipe): PostRecipeApiRequest => ({
    type: RecipeActionTypes.POST_RECIPE_REQUEST,
    recipe
});

export const postRecipeSuccess = (recipe: Recipe): PostRecipeSuccessApiResponse => ({
    type: RecipeActionTypes.POST_RECIPE_SUCCESS,
    recipe
});

export const postRecipeFailure = (code: number, json: object): RecipesFailureApiResponse => ({
    type: RecipeActionTypes.POST_RECIPE_FAILURE,
    code,
    json
});

export const putRecipeUpdateTagRequest = (recipe: Recipe, updatedTagId: string): PutRecipeUpdateTagApiRequest => ({
  type: RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_REQUEST,
  recipe,
  updatedTagId
});

export const putRecipeUpdateTagSuccess = (recipe: Recipe, updateRecipeTagId: string): PutRecipeUpdateTagSuccessApiResponse => ({
  type: RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_SUCCESS,
  recipe,
  updateRecipeTagId
});

export const putRecipeUpdateTagFailure = (code: number, updateRecipeTagFailureId: string, json: object): PutRecipeUpdateTagFailureApiResponse => ({
  type: RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_FAILURE,
  code,
  updateRecipeTagFailureId,
  json
});

export const clearRecipeUpdateTagFailure = (updateRecipeTagFailedId: string): ClearRecipeUpdateTagFailureApiResponse => ({
  type: RecipeActionTypes.CLEAR_RECIPE_UPDATE_TAG_FAILURE,
  updateRecipeTagFailedId
});