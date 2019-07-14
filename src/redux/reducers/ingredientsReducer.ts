'use strict';

import { Actions } from '../../globals/constants';

export default (state = {
    status: 'no_data',
    data: []
}, action) => {
    switch (action.type) {
        case Actions.ingredients.GET_INGREDIENTS_REQUEST_PENDING:
            return {
                status: 'pending',
                data: []
            };
        case Actions.ingredients.GET_INGREDIENTS_SUCCESS:
            return {
                status: action.payload.status,
                data: action.payload.data.ingredients
            };
        case Actions.ingredients.POST_INGREDIENT_REQUEST_PENDING:
            return {
                ...state,
                status: 'adding'
            };
        case Actions.ingredients.POST_INGREDIENT_SUCCESS:
            return {
                ...state,
                status: action.payload.status
            };
        case Actions.ingredients.POST_INGREDIENT_FAILED:
            return {
                ...state,
                status: action.payload.data.ingredient
            };
        default:
            return state;
    }
};