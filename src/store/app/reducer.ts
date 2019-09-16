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
            return {
                error: action.reason
            };

        default:
            return state;
    }
};