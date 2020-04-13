import { Reducer } from 'redux';

import { ErrorState, ErrorActionTypes, ErrorApiResponse } from './types';

const initialState: ErrorState = {
  message: null
}

export const errorReducer: Reducer<ErrorState, ErrorApiResponse> = (state = initialState, action: ErrorApiResponse) => {
  switch (action.type) {

    case ErrorActionTypes.UNEXPECTED_SERVER_ERROR:
    case ErrorActionTypes.UNEXPECTED_RESPONSE:
    case ErrorActionTypes.CLEAR_ERROR:
      const message: string = action.json.message;
      console.log("Error handler called with [" + message + "]");
      return {
        message
      };

    default:
      return state;
  }
};