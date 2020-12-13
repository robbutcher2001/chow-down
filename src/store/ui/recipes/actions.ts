import { RecipeUiActionTypes, RecipesUiChange, UpdateRecipeTagUiChange } from './types';

export const pendingGetRecipes = (): RecipesUiChange => ({
    type: RecipeUiActionTypes.GET_RECIPES_PENDING
});

export const clearPendingGetRecipes = (): RecipesUiChange => ({
    type: RecipeUiActionTypes.CLEAR_GET_RECIPES_PENDING
});

export const pendingPostRecipe = (): RecipesUiChange => ({
    type: RecipeUiActionTypes.POST_RECIPE_PENDING
});

export const clearPendingPostRecipe = (): RecipesUiChange => ({
    type: RecipeUiActionTypes.CLEAR_POST_RECIPE_PENDING
});

export const pendingPutRecipeTag = (updatedTagId: string): UpdateRecipeTagUiChange => ({
  type: RecipeUiActionTypes.PUT_RECIPE_TAG_PENDING,
  updatedTagId
});

export const clearPendingPutRecipeTag = (updatedTagId: string): UpdateRecipeTagUiChange => ({
  type: RecipeUiActionTypes.CLEAR_PUT_RECIPE_TAG_PENDING,
  updatedTagId
});