import { Reducer } from 'redux';

import {
  Recipe,
  RecipesState,
  RecipeActionTypes,
  GetRecipesApiResponse,
  GetRecipesSuccessApiResponse,
  PostRecipeSuccessApiResponse,
  RecipesFailureApiResponse,
  PutRecipeUpdateTagSuccessApiResponse,
  PutRecipeUpdateTagFailureApiResponse,
  ClearRecipeUpdateTagFailureApiResponse
} from './types';

const initialState: RecipesState = {
  failure: null,
  updateRecipeTagFailures: [],
  recipes: []
}

//TODO: when we separate out the success and failure reducers, we should be able to get rid of this interface as it'll just be RecipesFailureApiResponse
interface RecipesFailureResponse {
  message: string
}

//TODO: should we type-cast here?
export const recipesReducer: Reducer<RecipesState, GetRecipesApiResponse> = (state = initialState, action: GetRecipesApiResponse) => {
  switch (action.type) {

    case RecipeActionTypes.GET_RECIPES_SUCCESS:
      const successResponse = action as GetRecipesSuccessApiResponse;
      // to remove type-casting, we should be able to move to this once failure is implmented below
      // need a separate failure reducer so we don't need to use GetRecipesApiResponse anymore
      // const successResponse: RecipesSuccessApiResponse = action;
      recipeSearchableKeywords(successResponse.recipes);

      return {
        failure: null,
        updateRecipeTagFailures: [],
        recipes: successResponse.recipes
      };

    case RecipeActionTypes.POST_RECIPE_SUCCESS:
      const successResponsePost = action as PostRecipeSuccessApiResponse;
      const recipes = state.recipes.concat(successResponsePost.recipe);
      recipesSort(recipes);
      recipeSearchableKeywords(recipes);

      return {
        failure: null,
        updateRecipeTagFailures: [],
        recipes
      };

    case RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_SUCCESS:
      const successResponsePut = action as PutRecipeUpdateTagSuccessApiResponse;
      const updatedRecipes = state.recipes.filter(recipe => recipe.id !== successResponsePut.recipe.id).concat(successResponsePut.recipe);
      recipesSort(updatedRecipes);
      recipeSearchableKeywords(updatedRecipes);

      return {
        failure: null,
        updateRecipeTagFailures: state.updateRecipeTagFailures.filter(recipeTagFailure => recipeTagFailure !== successResponsePut.updateRecipeTagId),
        recipes: updatedRecipes
      };

    case RecipeActionTypes.GET_RECIPES_FAILURE:
    case RecipeActionTypes.POST_RECIPE_FAILURE:
      const failureResponse = action as RecipesFailureApiResponse;
      const failureJson = failureResponse.json as RecipesFailureResponse;

      return {
        failure: failureJson.message,
        updateRecipeTagFailures: [],
        recipes: []
      };

    case RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_FAILURE:
      const updateFailureResponse = action as PutRecipeUpdateTagFailureApiResponse;

      return {
        ...state,
        updateRecipeTagFailures: !state.updateRecipeTagFailures.includes(updateFailureResponse.updateRecipeTagFailureId) ?
          state.updateRecipeTagFailures.concat(updateFailureResponse.updateRecipeTagFailureId) :
          state.updateRecipeTagFailures
      };

    case RecipeActionTypes.CLEAR_RECIPE_UPDATE_TAG_FAILURE:
      const clearFailure = action as ClearRecipeUpdateTagFailureApiResponse;

      return {
        ...state,
        updateRecipeTagFailures: state.updateRecipeTagFailures.filter(recipeTagFailure => recipeTagFailure !== clearFailure.updateRecipeTagFailedId)
      };

    default:
      return state;
  }
};

const recipesSort = (recipes: Recipe[]) =>
  recipes.sort((a, b) => a.title.localeCompare(b.title));

const recipeSearchableKeywords = (recipes: Recipe[]) =>
  recipes.forEach(recipe =>
    recipe.getSearchableKeywords = () =>
    [...recipe.title.split(' '), ...recipe.description.split(' ')]
  );