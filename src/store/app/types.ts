import { Action } from 'redux';

export enum AppActionTypes {
    UNEXPECTED_SERVER_ERROR = '@@common/UNEXPECTED_SERVER_ERROR',
    UNEXPECTED_RESPONSE = '@@common/UNEXPECTED_RESPONSE',
    CLEAR_ERROR = '@@common/CLEAR_ERROR'
}

export interface AppState {
    readonly error: string
}

export interface ErrorApiResponse extends Action {
    type: AppActionTypes,
    json: {
        message: string
    }
}