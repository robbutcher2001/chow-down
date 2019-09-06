import { Reducer } from 'redux';

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

        default:
            return state;
    }
};