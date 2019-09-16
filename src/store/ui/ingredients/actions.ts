import { IngredientActionTypes, IngredientsUiChange } from './types';

export const pendingGetIngredients = (): IngredientsUiChange => ({
    type: IngredientActionTypes.GET_INGREDIENTS_PENDING
});

export const clearPendingGetIngredients = (): IngredientsUiChange => ({
    type: IngredientActionTypes.CLEAR_GET_INGREDIENTS_PENDING
});

export const pendingPostIngredients = (): IngredientsUiChange => ({
    type: IngredientActionTypes.POST_INGREDIENTS_PENDING
});

export const clearPendingPostIngredients = (): IngredientsUiChange => ({
    type: IngredientActionTypes.CLEAR_POST_INGREDIENTS_PENDING
});