import { Reducer } from 'redux';

import { AppState, AppActionTypes, ErrorApiResponse } from './types';

const initialState: AppState = {
    error: null
}

export const appReducer: Reducer<AppState, ErrorApiResponse> = (state = initialState, action: ErrorApiResponse) => {
    switch (action.type) {

        case AppActionTypes.UNEXPECTED_SERVER_ERROR:
        case AppActionTypes.UNEXPECTED_RESPONSE:
        case AppActionTypes.CLEAR_ERROR:
            const error: string = action.json.message;
            console.log("Error handler called with [" + error + "]");
            return {
                error
            };

        default:
            return state;
    }
};