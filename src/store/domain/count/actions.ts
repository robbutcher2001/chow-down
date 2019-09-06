import { CountActionTypes, CountApiRequest, CountSuccessApiResponse, CountFailureApiResponse } from './types';

export const incrementRequest = (increment: number): CountApiRequest => ({
    type: CountActionTypes.INCREMENT_REQUEST,
    payload: {
        increment
    }
});

export const incrementSuccess = (json: object): CountSuccessApiResponse => ({
    type: CountActionTypes.INCREMENT_SUCCESS,
    json
});

export const incrementFailure = (reason: string): CountFailureApiResponse => ({
    type: CountActionTypes.INCREMENT_FAILURE,
    reason
});

export const decrementRequest = (decrement: number): CountApiRequest => ({
    type: CountActionTypes.DECREMENT_REQUEST,
    payload: {
        decrement
    }
});

export const decrementSuccess = (json: object): CountSuccessApiResponse => ({
    type: CountActionTypes.DECREMENT_SUCCESS,
    json
});

export const decrementFailure = (reason: string): CountFailureApiResponse => ({
    type: CountActionTypes.DECREMENT_FAILURE,
    reason
});