'use strict';

import { Actions } from '../../globals/constants';

const initialState = {
    isError: false,
    message: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Actions.error.UNEXPECTED_SERVER_ERROR:
        case Actions.error.UNEXPECTED_RESPONSE:
            return {
                isError: true,
                message: action.payload
            }
        default:
            console.log('Clearing global error as default');
            return initialState;
    }
};