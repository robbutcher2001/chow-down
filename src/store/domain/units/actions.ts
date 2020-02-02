import { Unit, UnitActionTypes, GetUnitsApiRequest, PostUnitApiRequest, UnitsSuccessApiResponse, UnitsFailureApiResponse } from './types';

export const getUnitsRequest = (): GetUnitsApiRequest => ({
    type: UnitActionTypes.GET_UNITS_REQUEST
});

export const getUnitsSuccess = (units: Unit[]): UnitsSuccessApiResponse => ({
    type: UnitActionTypes.GET_UNITS_SUCCESS,
    units
});

export const getUnitsFailure = (code: number, json: object): UnitsFailureApiResponse => ({
    type: UnitActionTypes.GET_UNITS_FAILURE,
    code,
    json
});

export const postUnitsRequest = (unit: Unit): PostUnitApiRequest => ({
    type: UnitActionTypes.POST_UNITS_REQUEST,
    unit
});

export const postUnitsSuccess = (units: Unit[]): UnitsSuccessApiResponse => ({
    type: UnitActionTypes.POST_UNITS_SUCCESS,
    units
});

export const postUnitsFailure = (code: number, json: object): UnitsFailureApiResponse => ({
    type: UnitActionTypes.POST_UNITS_FAILURE,
    code,
    json
});