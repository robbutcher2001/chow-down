import { Reducer } from 'redux';

import { UnitsState, UnitActionTypes, GetUnitsApiResponse, UnitsSuccessApiResponse, UnitsFailureApiResponse } from './types';

const initialState: UnitsState = {
    error: null,
    units: []
}

interface UnitsResponse {
    status: string,
    data: {
        units: []
    }
}

//TODO: should we type-cast here?
export const unitsReducer: Reducer<UnitsState, GetUnitsApiResponse> = (state = initialState, action: GetUnitsApiResponse) => {
    switch (action.type) {

        case UnitActionTypes.GET_UNITS_SUCCESS:
            const successResponse = action as UnitsSuccessApiResponse;
            const json = successResponse.json as UnitsResponse;
            return {
                error: null,
                units: json.data.units
            };

        case UnitActionTypes.GET_UNITS_FAILURE:
            const failureResponse = action as UnitsFailureApiResponse;
            return {
                error: failureResponse.reason,
                units: []
            };

        default:
            return state;
    }
};