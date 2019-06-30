// import { GET_UNITS_SUCCESS } from '../../globals';

export default function (state = {
    status: 'no_data',
    data: []
}, action) {
    switch (action.type) {
        case 'GET_UNITS_REQUEST_PENDING':
            return {
                status: 'pending',
                data: []
            };
        case 'GET_UNITS_SUCCESS':
            return {
                status: action.payload.status,
                data: action.payload.data.units
            };
        case 'POST_UNIT_REQUEST_PENDING':
            return {
                ...state,
                status: 'adding'
            };
        case 'POST_UNIT_SUCCESS':
            return {
                ...state,
                status: action.payload.status
            };
        case 'POST_UNIT_FAILED':
            return {
                ...state,
                status: action.payload.data.unit
            };
        default:
            return state;
    }
}