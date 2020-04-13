import { Action } from 'redux';

export enum DayActionTypes {
    GET_DAYS_PENDING = '@@days/GET_PENDING',
    PUT_DAYS_PENDING = '@@days/PUT_PENDING',
    CLEAR_GET_DAYS_PENDING = '@@days/CLEAR_GET_PENDING',
    CLEAR_PUT_DAYS_PENDING = '@@days/CLEAR_PUT_PENDING'
}

export interface DaysUiState {
    readonly getPending: boolean,
    readonly putPending: boolean
}

export interface DaysUiChange extends Action {
    type: DayActionTypes
}