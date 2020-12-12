import { RecipeUiActionTypes, RecipesUiChange } from './types';

export const pendingGetRecipes = (): RecipesUiChange => ({
    type: RecipeUiActionTypes.GET_RECIPES_PENDING
});

export const clearPendingGetRecipes = (): RecipesUiChange => ({
    type: RecipeUiActionTypes.CLEAR_GET_RECIPES_PENDING
});

export const pendingPostRecipes = (): RecipesUiChange => ({
    type: RecipeUiActionTypes.POST_RECIPES_PENDING
});

export const clearPendingPostRecipes = (): RecipesUiChange => ({
    type: RecipeUiActionTypes.CLEAR_POST_RECIPES_PENDING
});

export const pendingPutRecipes = (): RecipesUiChange => ({
  type: RecipeUiActionTypes.PUT_RECIPES_PENDING
});

export const clearPendingPutRecipes = (): RecipesUiChange => ({
  type: RecipeUiActionTypes.CLEAR_PUT_RECIPES_PENDING
});