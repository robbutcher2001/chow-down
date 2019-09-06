import { Action } from 'redux';

export enum CountActionTypes {
    INCREMENT_REQUEST = '@@count/INCREMENT_REQUEST',
    INCREMENT_SUCCESS = '@@count/INCREMENT_SUCCESS',
    INCREMENT_FAILURE = '@@count/INCREMENT_FAILURE',
    DECREMENT_REQUEST = '@@count/DECREMENT_REQUEST',
    DECREMENT_SUCCESS = '@@count/DECREMENT_SUCCESS',
    DECREMENT_FAILURE = '@@count/DECREMENT_FAILURE'
}

export interface CountState {
    readonly value: number
}

export interface CountApiRequest extends Action {
    type: CountActionTypes,
    payload: object
}

export interface CountSuccessApiResponse extends Action {
    type: CountActionTypes,
    json: object
}

export interface CountFailureApiResponse extends Action {
    type: CountActionTypes,
    reason: string
}

export type CountApiResponse = CountSuccessApiResponse | CountFailureApiResponse;