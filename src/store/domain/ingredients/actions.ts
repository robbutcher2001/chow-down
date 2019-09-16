import { IngredientActionTypes, GetIngredientsApiRequest, PostIngredientApiRequest, IngredientsSuccessApiResponse, IngredientsFailureApiResponse } from './types';

export const getIngredientsRequest = (): GetIngredientsApiRequest => ({
    type: IngredientActionTypes.GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccess = (json: object): IngredientsSuccessApiResponse => ({
    type: IngredientActionTypes.GET_INGREDIENTS_SUCCESS,
    json
});

export const getIngredientsFailure = (code: number, json: object): IngredientsFailureApiResponse => ({
    type: IngredientActionTypes.GET_INGREDIENTS_FAILURE,
    code,
    json
});

export const postIngredientsRequest = (payload: object): PostIngredientApiRequest => ({
    type: IngredientActionTypes.POST_INGREDIENTS_REQUEST,
    payload
});

export const postIngredientsSuccess = (json: object): IngredientsSuccessApiResponse => ({
    type: IngredientActionTypes.POST_INGREDIENTS_SUCCESS,
    json
});

export const postIngredientsFailure = (code: number, json: object): IngredientsFailureApiResponse => ({
    type: IngredientActionTypes.POST_INGREDIENTS_FAILURE,
    code,
    json
});