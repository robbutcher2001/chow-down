import { ErrorActionTypes, ErrorMessageApiResponse, ErrorApiResponse } from './types';

export const unexpectedServerError = (json: ErrorMessageApiResponse): ErrorApiResponse => ({
  type: ErrorActionTypes.UNEXPECTED_SERVER_ERROR,
  json
});

export const unexpectedResponse = (json: ErrorMessageApiResponse): ErrorApiResponse => ({
  type: ErrorActionTypes.UNEXPECTED_RESPONSE,
  json
});

export const clearError = (): ErrorApiResponse => ({
  type: ErrorActionTypes.CLEAR_ERROR,
  json: {
    message: null
  }
});