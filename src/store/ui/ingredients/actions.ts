import { IngredientUiActionTypes, IngredientsUiChange } from './types';

export const pendingGetIngredients = (): IngredientsUiChange => ({
    type: IngredientUiActionTypes.GET_INGREDIENTS_PENDING
});

export const clearPendingGetIngredients = (): IngredientsUiChange => ({
    type: IngredientUiActionTypes.CLEAR_GET_INGREDIENTS_PENDING
});

export const pendingPostIngredients = (): IngredientsUiChange => ({
    type: IngredientUiActionTypes.POST_INGREDIENTS_PENDING
});

export const clearPendingPostIngredients = (): IngredientsUiChange => ({
    type: IngredientUiActionTypes.CLEAR_POST_INGREDIENTS_PENDING
});