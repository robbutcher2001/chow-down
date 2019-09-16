import { UnitActionTypes, GetUnitsApiRequest, PostUnitApiRequest, PendingUnitsApiRequest, UnitsSuccessApiResponse, UnitsFailureApiResponse } from './types';

export const getUnitsRequest = (): GetUnitsApiRequest => ({
    type: UnitActionTypes.GET_UNITS_REQUEST
});

export const pendingGetUnitsRequest = (): PendingUnitsApiRequest => ({
    type: UnitActionTypes.GET_UNITS_REQUEST_PENDING
});

export const getUnitsSuccess = (json: object): UnitsSuccessApiResponse => ({
    type: UnitActionTypes.GET_UNITS_SUCCESS,
    json
});

export const getUnitsFailure = (reason: string): UnitsFailureApiResponse => ({
    type: UnitActionTypes.GET_UNITS_FAILURE,
    reason
});

export const postUnitsRequest = (payload: object): PostUnitApiRequest => ({
    type: UnitActionTypes.POST_UNITS_REQUEST,
    payload
});

export const pendingPostUnitsRequest = (): PendingUnitsApiRequest => ({
    type: UnitActionTypes.POST_UNITS_REQUEST_PENDING
});

export const postUnitsSuccess = (json: object): UnitsSuccessApiResponse => ({
    type: UnitActionTypes.POST_UNITS_SUCCESS,
    json
});

export const postUnitsFailure = (reason: string): UnitsFailureApiResponse => ({
    type: UnitActionTypes.POST_UNITS_FAILURE,
    reason
});