// import { GET_INGREDIENTS_SUCCESS } from '../../globals';

export default function (state = [], action) {
    switch (action.type) {
        case 'GET_INGREDIENTS_SUCCESS':
            return [
                ...action.payload.data.ingredients
            ];
        default:
            return state;
    }
}