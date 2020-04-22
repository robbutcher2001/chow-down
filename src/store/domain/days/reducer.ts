import { Reducer } from 'redux';

import { Day, DayActionTypes, DaysFailureApiResponse, DaysState, GetDaysApiResponse, GetDaysSuccessApiResponse, PutDaySuccessApiResponse } from './types';

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
            const successGetResponse = action as GetDaysSuccessApiResponse;

            return {
                failure: null,
                days: successGetResponse.days
            };

        case DayActionTypes.PUT_DAYS_SUCCESS:
            const successPutResponse = action as PutDaySuccessApiResponse;
            const newDays: Day[] = state.days.filter(day => day.date !== successPutResponse.day.date);
            console.log('removed exisitng day');
            console.log(newDays);
            console.log(newDays.concat(successPutResponse.day));

            return {
                failure: null,
                days: successPutResponse.day.recipe ? newDays.concat(successPutResponse.day) : newDays
            };

        case DayActionTypes.GET_DAYS_FAILURE:
        case DayActionTypes.PUT_DAYS_FAILURE:
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