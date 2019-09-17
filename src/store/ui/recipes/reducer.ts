import { Reducer } from 'redux';

import { RecipesUiState, RecipeUiActionTypes, RecipesUiChange } from './types';

const initialState: RecipesUiState = {
    getPending: false,
    postPending: false
}

export const recipesUiReducer: Reducer<RecipesUiState, RecipesUiChange> = (state = initialState, action: RecipesUiChange) => {
    switch (action.type) {

        case RecipeUiActionTypes.GET_RECIPES_PENDING:
            return {
                ...state,
                getPending: true
            };

        case RecipeUiActionTypes.POST_RECIPES_PENDING:
            return {
                ...state,
                postPending: true
            };

        case RecipeUiActionTypes.CLEAR_GET_RECIPES_PENDING:
            return {
                ...state,
                getPending: false
            };

        case RecipeUiActionTypes.CLEAR_POST_RECIPES_PENDING:
            return {
                ...state,
                postPending: false
            };

        default:
            return state;
    }
};