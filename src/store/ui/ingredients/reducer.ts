import { Reducer } from 'redux';

import { IngredientsUiState, IngredientUiActionTypes, IngredientsUiChange } from './types';

const initialState: IngredientsUiState = {
    getPending: false,
    postPending: false
}

export const ingredientsUiReducer: Reducer<IngredientsUiState, IngredientsUiChange> = (state = initialState, action: IngredientsUiChange) => {
    switch (action.type) {

        case IngredientUiActionTypes.GET_INGREDIENTS_PENDING:
            return {
                ...state,
                getPending: true
            };

        case IngredientUiActionTypes.POST_INGREDIENTS_PENDING:
            return {
                ...state,
                postPending: true
            };

        case IngredientUiActionTypes.CLEAR_GET_INGREDIENTS_PENDING:
            return {
                ...state,
                getPending: false
            };

        case IngredientUiActionTypes.CLEAR_POST_INGREDIENTS_PENDING:
            return {
                ...state,
                postPending: false
            };

        default:
            return state;
    }
};