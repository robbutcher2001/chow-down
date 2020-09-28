import { Reducer } from 'redux';

import { DayActionTypes, DayFailureApiResponse, DaysState, GetDayApiResponse, GetDaySuccessApiResponse, PutDaySuccessApiResponse } from './types';

const initialState: DaysState = {
    failures: {},
    days: {}
}

interface DayFailureResponse {
    message: string
}

//TODO: should we type-cast here?
export const daysReducer: Reducer<DaysState, GetDayApiResponse> = (state = initialState, action: GetDayApiResponse) => {
    const failures = {
      ...state.failures
    };
    const days = {
      ...state.days
    };
    switch (action.type) {

        case DayActionTypes.GET_DAY_SUCCESS:
            const successGetResponse = action as GetDaySuccessApiResponse;
            delete failures[successGetResponse.date];

            return {
                failures,
                days: successGetResponse.day ?
                  {
                    ...days,
                    [successGetResponse.date]: successGetResponse.day
                  } :
                  days
            };

        case DayActionTypes.PUT_DAY_SUCCESS:
            const successPutResponse = action as PutDaySuccessApiResponse;
            delete failures[successPutResponse.day.date];
            delete days[successPutResponse.day.date];

            return {
                failures,
                days: successPutResponse.day.recipe || successPutResponse.day.alternateDay ?
                  {
                    ...days,
                    [successPutResponse.day.date]: successPutResponse.day
                  } :
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
                failures: {
                  ...failures,
                  [failureResponse.failedDay]: failureJson.message || 'Not able to load'
                }
            };

        default:
            return state;
    }
};