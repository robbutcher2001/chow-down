import { Reducer } from 'redux';

import { RecipesState, RecipeActionTypes, GetRecipesApiResponse, RecipesSuccessApiResponse, RecipesFailureApiResponse } from './types';

const initialState: RecipesState = {
    failure: null,
    recipes: []
}

interface RecipesSuccessResponse {
    recipes: []
}

interface RecipesFailureResponse {
    recipe: string
}

//TODO: should we type-cast here?
export const recipesReducer: Reducer<RecipesState, GetRecipesApiResponse> = (state = initialState, action: GetRecipesApiResponse) => {
    switch (action.type) {

        case RecipeActionTypes.GET_RECIPES_SUCCESS:
            const successResponse = action as RecipesSuccessApiResponse;
            const successJson = successResponse.json as RecipesSuccessResponse;
            return {
                failure: null,
                recipes: successJson.recipes
            };

        case RecipeActionTypes.GET_RECIPES_FAILURE:
        case RecipeActionTypes.POST_RECIPES_FAILURE:
            const failureResponse = action as RecipesFailureApiResponse;
            const failureJson = failureResponse.json as RecipesFailureResponse;
            return {
                failure: failureJson.recipe,
                recipes: []
            };

        default:
            return state;
    }
};