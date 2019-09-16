import { AppActionTypes, ErrorApiResponse } from './types';

export const unexpectedServerError = (reason: string): ErrorApiResponse => ({
    type: AppActionTypes.UNEXPECTED_SERVER_ERROR,
    reason
});

export const unexpectedResponse = (reason: string): ErrorApiResponse => ({
    type: AppActionTypes.UNEXPECTED_RESPONSE,
    reason
});

export const clearError = (): ErrorApiResponse => ({
    type: AppActionTypes.CLEAR_ERROR,
    reason: null
});