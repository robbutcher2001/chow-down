import { AppActionTypes, ErrorMessageApiResponse, ErrorApiResponse } from './types';

export const unexpectedServerError = (json: ErrorMessageApiResponse): ErrorApiResponse => ({
    type: AppActionTypes.UNEXPECTED_SERVER_ERROR,
    json
});

export const unexpectedResponse = (json: ErrorMessageApiResponse): ErrorApiResponse => ({
    type: AppActionTypes.UNEXPECTED_RESPONSE,
    json
});

export const clearError = (): ErrorApiResponse => ({
    type: AppActionTypes.CLEAR_ERROR,
    json: null
});