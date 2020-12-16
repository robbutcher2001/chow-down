import { Reducer } from 'redux';

import { RecipesUiState, RecipeUiActionTypes, AnyRecipeUiChange, UpdateRecipeTagUiChange } from './types';

const initialState: RecipesUiState = {
    getPending: false,
    postPending: false,
    putPending: new Map()
}

export const recipesUiReducer: Reducer<RecipesUiState, AnyRecipeUiChange> = (state = initialState, action: AnyRecipeUiChange) => {
    const { recipeId, updatedTagId } = action as UpdateRecipeTagUiChange;
    if (recipeId && !state.putPending.has(recipeId)) {
        state.putPending.set(recipeId, []);
    }

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
            if (!state.putPending.get(recipeId).includes(updatedTagId)) {
                state.putPending.set(recipeId, state.putPending.get(recipeId).concat(updatedTagId));
            }

            return {
                ...state,
                putPending: state.putPending
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
            state.putPending.set(recipeId, state.putPending.get(recipeId).filter(pendingDate => pendingDate !== updatedTagId));

            return {
                ...state,
                putPending: state.putPending
            };

        default:
            return state;
    }
};