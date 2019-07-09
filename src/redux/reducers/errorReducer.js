'use strict';

export default (state = {
    isError: false,
    message: ''
}, action) => {
    switch (action.type) {
        case 'UNEXPECTED_SERVER_ERROR':
        case 'UNEXPECTED_RESPONSE':
            return {
                isError: true,
                message: action.payload
            }
        case 'CLEAR_ERROR':
            console.log('Clearing global error');
            return {
                isError: false,
                message: ''
            }
        default:
            return state;
    }
};