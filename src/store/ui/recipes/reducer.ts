import { Reducer } from 'redux';

import { RecipesUiState, RecipeUiActionTypes, AnyRecipeUiChange, UpdateRecipeTagUiChange } from './types';

const initialState: RecipesUiState = {
    getPending: false,
    postPending: false,
    putPending: []
}

export const recipesUiReducer: Reducer<RecipesUiState, AnyRecipeUiChange> = (state = initialState, action: AnyRecipeUiChange) => {
    switch (action.type) {

        case RecipeUiActionTypes.GET_RECIPES_PENDING:
            return {
                ...state,
                getPending: true
            };

        case RecipeUiActionTypes.POST_RECIPE_PENDING:
            return {
                ...state,
                postPending: true
            };

        case RecipeUiActionTypes.PUT_RECIPE_TAG_PENDING:
            return {
                ...state,
                putPending: !state.putPending.includes((action as UpdateRecipeTagUiChange).updatedTagId) ?
                  state.putPending.concat((action as UpdateRecipeTagUiChange).updatedTagId) :
                  state.putPending
            };

        case RecipeUiActionTypes.CLEAR_GET_RECIPES_PENDING:
            return {
                ...state,
                getPending: false
            };

        case RecipeUiActionTypes.CLEAR_POST_RECIPE_PENDING:
            return {
                ...state,
                postPending: false
            };

        case RecipeUiActionTypes.CLEAR_PUT_RECIPE_TAG_PENDING:
            return {
                ...state,
                putPending: state.putPending.filter(pendingDate => pendingDate !== (action as UpdateRecipeTagUiChange).updatedTagId)
            };

        default:
            return state;
    }
};