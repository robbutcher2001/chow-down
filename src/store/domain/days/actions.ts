import { Day, DayActionTypes, DaysFailureApiResponse, GetDaysApiRequest, GetDaysSuccessApiResponse, PutDayApiRequest, PutDaySuccessApiResponse } from './types';

export const getDaysRequest = (from: string, to: string): GetDaysApiRequest => ({
  type: DayActionTypes.GET_DAYS_REQUEST,
  from,
  to
});

export const getDaysSuccess = (days: Day[]): GetDaysSuccessApiResponse => ({
  type: DayActionTypes.GET_DAYS_SUCCESS,
  days
});

export const getDaysFailure = (code: number, json: object): DaysFailureApiResponse => ({
  type: DayActionTypes.GET_DAYS_FAILURE,
  code,
  json
});

export const putDaysRequest = (day: Day): PutDayApiRequest => ({
  type: DayActionTypes.PUT_DAYS_REQUEST,
  day
});

export const putDaysSuccess = (day: Day): PutDaySuccessApiResponse => ({
  type: DayActionTypes.PUT_DAYS_SUCCESS,
  day
});

export const putDaysFailure = (code: number, json: object): DaysFailureApiResponse => ({
  type: DayActionTypes.PUT_DAYS_FAILURE,
  code,
  json
});