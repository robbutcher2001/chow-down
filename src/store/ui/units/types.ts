import { Action } from 'redux';

export enum UnitActionTypes {
    GET_UNITS_PENDING = '@@units/GET_PENDING',
    POST_UNITS_PENDING = '@@units/POST_PENDING',
    CLEAR_GET_UNITS_PENDING = '@@units/CLEAR_GET_PENDING',
    CLEAR_POST_UNITS_PENDING = '@@units/CLEAR_POST_PENDING'
}

export interface UnitsUiState {
    readonly getPending: boolean,
    readonly postPending: boolean
}

export interface UnitsUiChange extends Action {
    type: UnitActionTypes
}