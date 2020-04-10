import { Action } from 'redux';

export enum DayActionTypes {
    GET_DAYS_PENDING = '@@days/GET_PENDING',
    POST_DAYS_PENDING = '@@days/POST_PENDING',
    CLEAR_GET_DAYS_PENDING = '@@days/CLEAR_GET_PENDING',
    CLEAR_POST_DAYS_PENDING = '@@days/CLEAR_POST_PENDING'
}

export interface DaysUiState {
    readonly getPending: boolean,
    readonly postPending: boolean
}

export interface DaysUiChange extends Action {
    type: DayActionTypes
}