import { Action } from 'redux';

export enum DayActionTypes {
    GET_DAY_PENDING = '@@days/GET_PENDING',
    PUT_DAY_PENDING = '@@days/PUT_PENDING',
    CLEAR_GET_DAY_PENDING = '@@days/CLEAR_GET_PENDING',
    CLEAR_PUT_DAY_PENDING = '@@days/CLEAR_PUT_PENDING'
}

export interface DaysUiState {
    readonly getPending: string[],
    readonly putPending: string[]
}

export interface DaysUiChange extends Action {
    type: DayActionTypes,
    date: string
}