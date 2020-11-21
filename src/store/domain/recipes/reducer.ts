import { Reducer } from 'redux';

import { Recipe, RecipesState, RecipeActionTypes, GetRecipesApiResponse, RecipesSuccessApiResponse, RecipesFailureApiResponse } from './types';

const initialState: RecipesState = {
  failure: null,
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
      const successResponse = action as RecipesSuccessApiResponse;
      // to remove type-casting, we should be able to move to this once failure is implmented below
      // need a separate failure reducer so we don't need to use GetRecipesApiResponse anymore
      // const successResponse: RecipesSuccessApiResponse = action;
      recipeSearchableKeywords(successResponse.recipes);

      return {
        failure: null,
        recipes: successResponse.recipes
      };

    case RecipeActionTypes.POST_RECIPES_SUCCESS:
      const successResponsePost = action as RecipesSuccessApiResponse;
      const recipes = state.recipes.concat(successResponsePost.recipes);
      recipesSort(recipes);
      recipeSearchableKeywords(successResponse.recipes);

      return {
        failure: null,
        recipes
      };

    case RecipeActionTypes.GET_RECIPES_FAILURE:
    case RecipeActionTypes.POST_RECIPES_FAILURE:
      const failureResponse = action as RecipesFailureApiResponse;
      const failureJson = failureResponse.json as RecipesFailureResponse;

      return {
        failure: failureJson.message,
        recipes: []
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