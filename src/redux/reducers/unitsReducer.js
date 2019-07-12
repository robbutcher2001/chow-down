'use strict';

import { Actions } from '../../globals/constants';

export default (state = {
    status: 'no_data',
    data: []
}, action) => {
    switch (action.type) {
        case Actions.units.GET_UNITS_REQUEST_PENDING:
            return {
                status: 'pending',
                data: []
            };
        case Actions.units.GET_UNITS_SUCCESS:
            return {
                status: action.payload.status,
                data: action.payload.data.units
            };
        case Actions.units.POST_UNIT_REQUEST_PENDING:
            return {
                ...state,
                status: 'adding'
            };
        case Actions.units.POST_UNIT_SUCCESS:
            return {
                ...state,
                status: action.payload.status
            };
        case Actions.units.POST_UNIT_FAILED:
            return {
                ...state,
                status: action.payload.data.unit
            };
        default:
            return state;
    }
};