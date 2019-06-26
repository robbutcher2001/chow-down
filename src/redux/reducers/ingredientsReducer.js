// import { GET_INGREDIENTS_SUCCESS } from '../../globals';

export default function (state = {
    status: 'no_data',
    data: []
}, action) {
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
        case 'PUT_INGREDIENT_REQUEST_PENDING':
            return {
                ...state,
                status: 'adding'
            };
        case 'PUT_INGREDIENT_SUCCESS':
            return {
                ...state,
                status: action.payload.status
            };
        default:
            return state;
    }
}