import { Reducer } from 'redux';

import { IngredientsUiState, IngredientActionTypes, IngredientsUiChange } from './types';

const initialState: IngredientsUiState = {
    getPending: false,
    postPending: false
}

export const ingredientsUiReducer: Reducer<IngredientsUiState, IngredientsUiChange> = (state = initialState, action: IngredientsUiChange) => {
    switch (action.type) {

        case IngredientActionTypes.GET_INGREDIENTS_PENDING:
            return {
                ...state,
                getPending: true
            };

        case IngredientActionTypes.POST_INGREDIENTS_PENDING:
            return {
                ...state,
                postPending: true
            };

        case IngredientActionTypes.CLEAR_GET_INGREDIENTS_PENDING:
            return {
                ...state,
                getPending: false
            };

        case IngredientActionTypes.CLEAR_POST_INGREDIENTS_PENDING:
            return {
                ...state,
                postPending: false
            };

        default:
            return state;
    }
};