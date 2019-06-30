// import { GET_RECIPES_SUCCESS } from '../../globals';

export default function (state = [], action) {
    switch (action.type) {
        case 'GET_RECIPES_SUCCESS':
            return [
                ...action.payload.data.recipes
            ];
        default:
            return state;
    }
}