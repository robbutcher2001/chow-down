'use strict';

// import { GET_RECIPES_SUCCESS } from '../../globals';

export default (state = {
    status: {
        pending: false
    },
    data: []
}, action) => {
    switch (action.type) {
        case 'GET_RECIPES_REQUEST_PENDING':
            return {
                status: {
                    pending: true
                },
                data: []
            };
        case 'GET_RECIPES_SUCCESS':
            return {
                status: {
                    pending: false
                },
                data: action.payload.data.recipes
            };
        default:
            return state;
    }
};