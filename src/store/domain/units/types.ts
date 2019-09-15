import { Action } from 'redux';

export enum UnitActionTypes {
    GET_UNITS_REQUEST = '@@units/GET_REQUEST',
    GET_UNITS_REQUEST_PENDING = '@@units/GET_REQUEST_PENDING',
    GET_UNITS_SUCCESS = '@@units/GET_SUCCESS',
    GET_UNITS_FAILURE = '@@units/GET_FAILURE',
    POST_UNITS_REQUEST = '@@units/POST_REQUEST',
    POST_UNITS_REQUEST_PENDING = '@@units/POST_REQUEST_PENDING',
    POST_UNITS_SUCCESS = '@@units/POST_SUCCESS',
    POST_UNITS_FAILURE = '@@units/POST_FAILURE'
}

export interface Unit {
    id: string,
    title: string,
    url: string,
    description: string,
    image: string
}

export interface UnitsState {
    readonly error: string,
    readonly units: Unit[]
}

export interface GetUnitsApiRequest extends Action {
    type: UnitActionTypes
}

export interface PostUnitApiRequest extends Action {
    type: UnitActionTypes,
    payload: object
}

export interface PendingUnitsApiRequest extends Action {
    type: UnitActionTypes
}

export interface UnitsSuccessApiResponse extends Action {
    type: UnitActionTypes,
    json: object
}

export interface UnitsFailureApiResponse extends Action {
    type: UnitActionTypes,
    reason: string
}

export type GetUnitsApiResponse = UnitsSuccessApiResponse | UnitsFailureApiResponse;