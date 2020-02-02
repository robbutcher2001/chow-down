import { Ingredient, IngredientActionTypes, GetIngredientsApiRequest, PostIngredientApiRequest, IngredientsSuccessApiResponse, IngredientsFailureApiResponse } from './types';

export const getIngredientsRequest = (): GetIngredientsApiRequest => ({
    type: IngredientActionTypes.GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccess = (ingredients: Ingredient[]): IngredientsSuccessApiResponse => ({
    type: IngredientActionTypes.GET_INGREDIENTS_SUCCESS,
    ingredients
});

export const getIngredientsFailure = (code: number, json: object): IngredientsFailureApiResponse => ({
    type: IngredientActionTypes.GET_INGREDIENTS_FAILURE,
    code,
    json
});

export const postIngredientsRequest = (ingredient: Ingredient): PostIngredientApiRequest => ({
    type: IngredientActionTypes.POST_INGREDIENTS_REQUEST,
    ingredient
});

export const postIngredientsSuccess = (ingredients: Ingredient[]): IngredientsSuccessApiResponse => ({
    type: IngredientActionTypes.POST_INGREDIENTS_SUCCESS,
    ingredients
});

export const postIngredientsFailure = (code: number, json: object): IngredientsFailureApiResponse => ({
    type: IngredientActionTypes.POST_INGREDIENTS_FAILURE,
    code,
    json
});