import { UnitActionTypes, GetUnitsApiRequest, PostUnitApiRequest, UnitsSuccessApiResponse, UnitsFailureApiResponse } from './types';

export const getUnitsRequest = (): GetUnitsApiRequest => ({
    type: UnitActionTypes.GET_UNITS_REQUEST
});

export const getUnitsSuccess = (json: object): UnitsSuccessApiResponse => ({
    type: UnitActionTypes.GET_UNITS_SUCCESS,
    json
});

export const getUnitsFailure = (code: number, json: object): UnitsFailureApiResponse => ({
    type: UnitActionTypes.GET_UNITS_FAILURE,
    code,
    json
});

export const postUnitsRequest = (payload: object): PostUnitApiRequest => ({
    type: UnitActionTypes.POST_UNITS_REQUEST,
    payload
});

export const postUnitsSuccess = (json: object): UnitsSuccessApiResponse => ({
    type: UnitActionTypes.POST_UNITS_SUCCESS,
    json
});

export const postUnitsFailure = (code: number, json: object): UnitsFailureApiResponse => ({
    type: UnitActionTypes.POST_UNITS_FAILURE,
    code,
    json
});