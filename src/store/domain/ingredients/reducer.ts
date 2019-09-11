import { Reducer } from 'redux';

import { CommonActionTypes } from '../common/types';
import { IngredientsState, IngredientActionTypes, GetIngredientsApiResponse, IngredientsSuccessApiResponse, IngredientsFailureApiResponse } from './types';

const initialState: IngredientsState = {
    error: null,
    ingredients: []
}

interface IngredientsResponse {
    status: string,
    data: {
        ingredients: []
    }
}

//TODO: should we type-cast here?
export const ingredientsReducer: Reducer<IngredientsState, GetIngredientsApiResponse> = (state = initialState, action: GetIngredientsApiResponse) => {
    switch (action.type) {

        case IngredientActionTypes.GET_INGREDIENTS_SUCCESS:
            const successResponse = action as IngredientsSuccessApiResponse;
            const json = successResponse.json as IngredientsResponse;
            return {
                error: null,
                ingredients: json.data.ingredients
            };

        case IngredientActionTypes.GET_INGREDIENTS_FAILURE:
            const failureResponse = action as IngredientsFailureApiResponse;
            return {
                error: failureResponse.reason,
                ingredients: []
            };

        case CommonActionTypes.UNEXPECTED_RESPONSE:
        case CommonActionTypes.UNEXPECTED_SERVER_ERROR:
            return {

            };

        default:
            return state;
    }
};