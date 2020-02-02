import { Reducer } from 'redux';

import { Ingredient, IngredientsState, IngredientActionTypes, GetIngredientsApiResponse, IngredientsSuccessApiResponse, IngredientsFailureApiResponse } from './types';

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

        // TODO: split into a GET reducer and a POST reducer
        case IngredientActionTypes.GET_INGREDIENTS_SUCCESS:
            const successResponseGet = action as IngredientsSuccessApiResponse;
            // const successJson = successResponse.json as IngredientsSuccessResponse;
            ingredientsSort(successResponseGet.ingredients);

            return {
                failure: null,
                ingredients: successResponseGet.ingredients
            };

        case IngredientActionTypes.POST_INGREDIENTS_SUCCESS:
            const successResponsePost = action as IngredientsSuccessApiResponse;
            const ingredients = state.ingredients.concat(successResponsePost.ingredients);
            ingredientsSort(ingredients);

            return {
                failure: null,
                ingredients
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

const ingredientsSort = (ingredients: Ingredient[]) =>
    ingredients.sort((a, b) => a.ingredient.localeCompare(b.ingredient));