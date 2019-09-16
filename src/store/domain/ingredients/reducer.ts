import { Reducer } from 'redux';

import { IngredientsState, IngredientActionTypes, GetIngredientsApiResponse, IngredientsSuccessApiResponse, IngredientsFailureApiResponse } from './types';

const initialState: IngredientsState = {
    failure: null,
    ingredients: []
}

//TODO: move the status field up to actions and ref in api.ts
interface IngredientsSuccessResponse {
    ingredients: []
}

interface IngredientsFailureResponse {
    ingredient: string
}

//TODO: should we type-cast here?
export const ingredientsReducer: Reducer<IngredientsState, GetIngredientsApiResponse> = (state = initialState, action: GetIngredientsApiResponse) => {
    switch (action.type) {

        case IngredientActionTypes.GET_INGREDIENTS_SUCCESS:
            const successResponse = action as IngredientsSuccessApiResponse;
            const successJson = successResponse.json as IngredientsSuccessResponse;
            return {
                failure: null,
                ingredients: successJson.ingredients
            };

        case IngredientActionTypes.GET_INGREDIENTS_FAILURE:
        case IngredientActionTypes.POST_INGREDIENTS_FAILURE:
            const failureResponse = action as IngredientsFailureApiResponse;
            const failureJson = failureResponse.json as IngredientsFailureResponse;
            return {
                failure: failureJson.ingredient,
                ingredients: []
            };

        default:
            return state;
    }
};