import { Reducer } from 'redux';

import { UnitsState, UnitActionTypes, GetUnitsApiResponse, UnitsSuccessApiResponse, UnitsFailureApiResponse } from './types';

const initialState: UnitsState = {
    failure: null,
    units: []
}

interface UnitsSuccessResponse {
    status: string,
    data: {
        units: []
    }
}

interface UnitsFailureResponse {
    status: string,
    data: {
        unit: string
    }
}

//TODO: should we type-cast here?
export const unitsReducer: Reducer<UnitsState, GetUnitsApiResponse> = (state = initialState, action: GetUnitsApiResponse) => {
    switch (action.type) {

        case UnitActionTypes.GET_UNITS_SUCCESS:
            const successResponse = action as UnitsSuccessApiResponse;
            const successJson = successResponse.json as UnitsSuccessResponse;
            return {
                failure: null,
                units: successJson.data.units
            };

        case UnitActionTypes.GET_UNITS_FAILURE:
            const failureResponse = action as UnitsFailureApiResponse;
            const failureJson = failureResponse.json as UnitsFailureResponse;
            return {
                failure: failureJson.data.unit,
                units: []
            };

        default:
            return state;
    }
};