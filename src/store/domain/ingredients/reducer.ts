import { Reducer } from 'redux';

import { IngredientsState, IngredientActionTypes, GetIngredientsApiResponse, IngredientsSuccessApiResponse, IngredientsFailureApiResponse } from './types';

const initialState: IngredientsState = {
    failure: null,
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
            // const successJson = successResponse.json as IngredientsSuccessResponse;
            return {
                failure: null,
                ingredients: successResponse.ingredients
            };

        case IngredientActionTypes.POST_INGREDIENTS_SUCCESS:
            return {
                failure: null,
                ingredients: state.ingredients.concat((action as IngredientsSuccessApiResponse).ingredients)
            };

        case IngredientActionTypes.GET_INGREDIENTS_FAILURE:
        case IngredientActionTypes.POST_INGREDIENTS_FAILURE:
            const failureResponse = action as IngredientsFailureApiResponse;
            const failureJson = failureResponse.json as IngredientsFailureResponse;
            console.log(failureResponse.code);

            if (failureResponse.code === 410) {
                return {
                    failure: 'No ingredients yet!',
                    ingredients: []
                };
            }

            return {
                failure: failureJson.ingredient,
                ingredients: []
            };

        default:
            return state;
    }
};