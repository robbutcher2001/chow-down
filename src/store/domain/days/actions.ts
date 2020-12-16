import { Day, DayActionTypes, DayFailureApiResponse, GetDayApiRequest, GetDaySuccessApiResponse, PutDayApiRequest, PutDaySuccessApiResponse } from './types';

export const getDayRequest = (date: string): GetDayApiRequest => ({
  type: DayActionTypes.GET_DAY_REQUEST,
  date
});

export const getDaySuccess = (date: string, day: Day): GetDaySuccessApiResponse => ({
  type: DayActionTypes.GET_DAY_SUCCESS,
  date,
  day
});

export const getDayFailure = (code: number, failedDay: string, json: object): DayFailureApiResponse => ({
  type: DayActionTypes.GET_DAY_FAILURE,
  code,
  failedDay,
  json
});

export const putDayRequest = (day: Day): PutDayApiRequest => ({
  type: DayActionTypes.PUT_DAY_REQUEST,
  day
});

export const putDaySuccess = (day: Day): PutDaySuccessApiResponse => ({
  type: DayActionTypes.PUT_DAY_SUCCESS,
  day
});

export const putDayFailure = (code: number, failedDay: string, json: object): DayFailureApiResponse => ({
  type: DayActionTypes.PUT_DAY_FAILURE,
  code,
  failedDay,
  json
});