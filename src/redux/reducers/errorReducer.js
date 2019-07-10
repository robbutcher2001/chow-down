'use strict';

const initialState = {
    isError: false,
    message: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UNEXPECTED_SERVER_ERROR':
        case 'UNEXPECTED_RESPONSE':
            return {
                isError: true,
                message: action.payload
            }
        default:
            console.log('Clearing global error as default');
            return initialState;
    }
};