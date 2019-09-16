'use strict';

import { Actions } from '../../globals/constants';

export default (state = {
    status: {
        pending: false
    },
    data: []
}, action) => {
    switch (action.type) {
        case Actions.recipes.GET_RECIPES_REQUEST_PENDING:
            return {
                status: {
                    pending: true
                },
                data: []
            };
        case Actions.recipes.GET_RECIPES_SUCCESS:
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