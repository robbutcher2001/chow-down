import { put } from 'redux-saga/effects';

import { Day, PutDayApiRequest } from '../types';
import { putDaySuccess, putDayFailure } from '../actions';
import { pendingPutDay, clearPendingPutDay } from '../../../ui/days/actions';
import { put as putApi } from '../../../api';

const URL = `${process.env.API_BASE}/api/days`;

export default function* putSaga(action: PutDayApiRequest) {
    yield put(pendingPutDay(action.day.date));
    yield putApi(URL, successCallback, failCallback, action.day, action.day.date);
};

function* successCallback(day: Day) {
    console.log('Calling putDaySuccessCallback');
    yield put(clearPendingPutDay(day.date));
    yield put(putDaySuccess(day));
};

function* failCallback(code: number, json: object, ...dates: string[]) {
    console.log('Calling putDayFailCallback');
    for (let i = 0; i < dates.length; i++) {
      yield put(clearPendingPutDay(dates[i]));
      yield put(putDayFailure(code, dates[i], json));
    }
};