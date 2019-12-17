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
            // to remove type-casting, we should be able to move to this once failure is implmented below
            // const successResponse: RecipesSuccessApiResponse = action;
            return {
                failure: null,
                recipes: successResponse.recipes
            };

        case RecipeActionTypes.GET_RECIPES_FAILURE:
        case RecipeActionTypes.POST_RECIPES_FAILURE:
            const failureResponse = action as RecipesFailureApiResponse;
            const failureJson = failureResponse.json as RecipesFailureResponse;
            console.log(failureResponse.code);

            if (failureResponse.code === 410) {
                return {
                    failure: 'No recipes found',
                    recipes: []
                };
            }

            return {
                failure: failureJson.recipe,
                recipes: []
            };

        default:
            return state;
    }
};