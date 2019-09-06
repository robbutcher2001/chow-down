import { IngredientActionTypes, GetIngredientsApiRequest, PostIngredientApiRequest, PendingIngredientsApiRequest, IngredientsSuccessApiResponse, IngredientsFailureApiResponse } from './types';

export const getIngredientsRequest = (): GetIngredientsApiRequest => ({
    type: IngredientActionTypes.GET_INGREDIENTS_REQUEST
});

export const pendingGetIngredientsRequest = (): PendingIngredientsApiRequest => ({
    type: IngredientActionTypes.GET_INGREDIENTS_REQUEST_PENDING
});

export const getIngredientsSuccess = (json: object): IngredientsSuccessApiResponse => ({
    type: IngredientActionTypes.GET_INGREDIENTS_SUCCESS,
    json
});

export const getIngredientsFailure = (reason: string): IngredientsFailureApiResponse => ({
    type: IngredientActionTypes.GET_INGREDIENTS_FAILURE,
    reason
});

export const postIngredientsRequest = (payload: object): PostIngredientApiRequest => ({
    type: IngredientActionTypes.POST_INGREDIENTS_REQUEST,
    payload
});

export const pendingPostIngredientsRequest = (): PendingIngredientsApiRequest => ({
    type: IngredientActionTypes.POST_INGREDIENTS_REQUEST
});

export const postIngredientsSuccess = (json: object): IngredientsSuccessApiResponse => ({
    type: IngredientActionTypes.POST_INGREDIENTS_SUCCESS,
    json
});

export const postIngredientsFailure = (reason: string): IngredientsFailureApiResponse => ({
    type: IngredientActionTypes.POST_INGREDIENTS_FAILURE,
    reason
});