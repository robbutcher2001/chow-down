import { Reducer } from 'redux';

import { Unit, UnitsState, UnitActionTypes, GetUnitsApiResponse, UnitsSuccessApiResponse, UnitsFailureApiResponse } from './types';

const initialState: UnitsState = {
    failure: null,
    units: []
}

interface UnitsFailureResponse {
    unit: string
}

//TODO: should we type-cast here?
export const unitsReducer: Reducer<UnitsState, GetUnitsApiResponse> = (state = initialState, action: GetUnitsApiResponse) => {
    switch (action.type) {

        case UnitActionTypes.GET_UNITS_SUCCESS:
            const successResponse = action as UnitsSuccessApiResponse;
            // const successJson = successResponse.json as UnitsSuccessResponse;
            unitsSort(successResponse.units);

            return {
                failure: null,
                units: successResponse.units
            };

        case UnitActionTypes.POST_UNITS_SUCCESS:
            return {
                failure: null,
                units: state.units.concat((action as UnitsSuccessApiResponse).units)
            };

        case UnitActionTypes.GET_UNITS_FAILURE:
        case UnitActionTypes.POST_UNITS_FAILURE:
            const failureResponse = action as UnitsFailureApiResponse;
            const failureJson = failureResponse.json as UnitsFailureResponse;
            console.log(failureResponse.code);

            if (failureResponse.code === 410) {
                return {
                    failure: 'No units yet!',
                    units: []
                };
            }

            return {
                failure: failureJson.unit,
                units: []
            };

        default:
            return state;
    }
};

const unitsSort = (units: Unit[]) =>
    units.sort((a, b) => a.singular.localeCompare(b.singular));