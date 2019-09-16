import { Reducer } from 'redux';

import { RecipesState, RecipeActionTypes, GetRecipesApiResponse, RecipesSuccessApiResponse, RecipesFailureApiResponse } from './types';

const initialState: RecipesState = {
    error: null,
    recipes: []
}

interface RecipesResponse {
    status: string,
    data: {
        recipes: []
    }
}

//TODO: should we type-cast here?
export const recipesReducer: Reducer<RecipesState, GetRecipesApiResponse> = (state = initialState, action: GetRecipesApiResponse) => {
    switch (action.type) {

        case RecipeActionTypes.GET_RECIPES_SUCCESS:
            const successResponse = action as RecipesSuccessApiResponse;
            const json = successResponse.json as RecipesResponse;
            return {
                error: null,
                recipes: json.data.recipes
            };

        case RecipeActionTypes.GET_RECIPES_FAILURE:
            const failureResponse = action as RecipesFailureApiResponse;
            return {
                error: failureResponse.reason,
                recipes: []
            };

        default:
            return state;
    }
};