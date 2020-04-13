import { Action } from 'redux';

export enum ErrorActionTypes {
  UNEXPECTED_SERVER_ERROR = '@@common/UNEXPECTED_SERVER_ERROR',
  UNEXPECTED_RESPONSE = '@@common/UNEXPECTED_RESPONSE',
  CLEAR_ERROR = '@@common/CLEAR_ERROR'
}

export interface ErrorState {
  readonly message: string
}

export interface ErrorMessageApiResponse {
  message: string
}

export interface ErrorApiResponse extends Action {
  type: ErrorActionTypes,
  json: ErrorMessageApiResponse
}