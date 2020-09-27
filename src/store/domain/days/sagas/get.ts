import { put } from 'redux-saga/effects';

import { Day, GetDayApiRequest } from '../types';
import { getDaySuccess, getDayFailure } from '../actions';
import { pendingGetDay, clearPendingGetDay } from '../../../ui/days/actions';
import { get } from '../../../api';

const URL = `${process.env.API_BASE}/api/days`;

export default function* getSaga(action: GetDayApiRequest) {
    yield put(pendingGetDay(action.date));
    yield get(`${URL}?from=${action.date}&to=${action.date}`, successCallback, failCallback, action.date);
};

function* successCallback(days: Day[], ...dates: string[]) {
    console.log('Calling getDaySuccessCallback');
    for (let i = 0; i < dates.length; i++) {
      yield put(clearPendingGetDay(dates[i]));
      yield put(getDaySuccess(dates[i], days.find(day => day.date === dates[i])));
    }
};

function* failCallback(code: number, json: object, ...dates: string[]) {
    console.log('Calling getDayFailCallback');
    for (let i = 0; i < dates.length; i++) {
      yield put(clearPendingGetDay(dates[i]));
      yield put(getDayFailure(code, dates[i], json));
    }
};