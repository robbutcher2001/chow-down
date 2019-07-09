'use strict';

// import { GET_INGREDIENTS_SUCCESS } from '../../globals';

export default (state = {
    status: 'no_data',
    data: []
}, action) => {
    switch (action.type) {
        case 'GET_INGREDIENTS_REQUEST_PENDING':
            return {
                status: 'pending',
                data: []
            };
        case 'GET_INGREDIENTS_SUCCESS':
            return {
                status: action.payload.status,
                data: action.payload.data.ingredients
            };
        case 'POST_INGREDIENT_REQUEST_PENDING':
            return {
                ...state,
                status: 'adding'
            };
        case 'POST_INGREDIENT_SUCCESS':
            return {
                ...state,
                status: action.payload.status
            };
        case 'POST_INGREDIENT_FAILED':
            return {
                ...state,
                status: action.payload.data.ingredient
            };
        default:
            return state;
    }
};