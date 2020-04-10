import { Reducer } from 'redux';

import { DaysState, DayActionTypes, GetDaysApiResponse, DaysSuccessApiResponse, DaysFailureApiResponse } from './types';

const initialState: DaysState = {
    failure: null,
    days: []
}

interface DaysFailureResponse {
    message: string
}

//TODO: should we type-cast here?
export const daysReducer: Reducer<DaysState, GetDaysApiResponse> = (state = initialState, action: GetDaysApiResponse) => {
    switch (action.type) {

        case DayActionTypes.GET_DAYS_SUCCESS:
            const successResponse = action as DaysSuccessApiResponse;
            // const successJson = successResponse.json as DaysSuccessResponse;

            return {
                failure: null,
                days: successResponse.days
            };

        case DayActionTypes.POST_DAYS_SUCCESS:
            return {
                failure: null,
                days: state.days.concat((action as DaysSuccessApiResponse).days)
            };

        case DayActionTypes.GET_DAYS_FAILURE:
        case DayActionTypes.POST_DAYS_FAILURE:
            const failureResponse = action as DaysFailureApiResponse;
            const failureJson = failureResponse.json as DaysFailureResponse;

            return {
                failure: failureJson.message,
                days: []
            };

        default:
            return state;
    }
};