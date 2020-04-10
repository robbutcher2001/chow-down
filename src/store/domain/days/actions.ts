import { Day, DayActionTypes, GetDaysApiRequest, PostDayApiRequest, DaysSuccessApiResponse, DaysFailureApiResponse } from './types';

export const getDaysRequest = (from: string, to: string): GetDaysApiRequest => ({
    type: DayActionTypes.GET_DAYS_REQUEST,
    from,
    to
});

export const getDaysSuccess = (days: Day[]): DaysSuccessApiResponse => ({
    type: DayActionTypes.GET_DAYS_SUCCESS,
    days
});

export const getDaysFailure = (code: number, json: object): DaysFailureApiResponse => ({
    type: DayActionTypes.GET_DAYS_FAILURE,
    code,
    json
});

export const postDaysRequest = (day: Day): PostDayApiRequest => ({
    type: DayActionTypes.POST_DAYS_REQUEST,
    day
});

export const postDaysSuccess = (days: Day[]): DaysSuccessApiResponse => ({
    type: DayActionTypes.POST_DAYS_SUCCESS,
    days
});

export const postDaysFailure = (code: number, json: object): DaysFailureApiResponse => ({
    type: DayActionTypes.POST_DAYS_FAILURE,
    code,
    json
});