import { Reducer } from 'redux';

import { Day, DayActionTypes, DayFailureApiResponse, DaysState, GetDayApiResponse, GetDaySuccessApiResponse, PutDaySuccessApiResponse } from './types';

const initialState: DaysState = {
    failures: {},
    days: {}
}

interface DayFailureResponse {
    message: string
}

//TODO: should we type-cast here?
export const daysReducer: Reducer<DaysState, GetDayApiResponse> = (state = initialState, action: GetDayApiResponse) => {
    const failures = Object.assign({}, state.failures);
    const days = Object.assign({}, state.days);
    switch (action.type) {

        case DayActionTypes.GET_DAY_SUCCESS:
            const successGetResponse = action as GetDaySuccessApiResponse;
            delete failures[successGetResponse.date];
            delete days[successGetResponse.date];

            return {
                failures,
                days: successGetResponse.day ?
                  Object.assign({}, days, {
                    [successGetResponse.date]: successGetResponse.day
                  }) :
                  days
            };

        case DayActionTypes.PUT_DAY_SUCCESS:
            const successPutResponse = action as PutDaySuccessApiResponse;
            delete failures[successPutResponse.day.date];
            delete days[successPutResponse.day.date];

            return {
                failures,
                days: successPutResponse.day.recipe || successPutResponse.day.alternateDay ?
                  Object.assign({}, days, {
                    [successPutResponse.day.date]: successPutResponse.day
                  }) :
                  days
            };

        case DayActionTypes.GET_DAY_FAILURE:
        case DayActionTypes.PUT_DAY_FAILURE:
            const failureResponse = action as DayFailureApiResponse;
            const failureJson = failureResponse.json as DayFailureResponse;

            console.log('destructed `message` from response json:');
            console.log(failureJson.message);
            return {
                ...state,
                failures: Object.assign({}, failures, {
                  [failureResponse.failedDay]: failureJson.message || 'Not able to load'
                })
            };

        default:
            return state;
    }
};