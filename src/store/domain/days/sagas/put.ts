import { Action } from 'redux';
import { put } from 'redux-saga/effects';

import { Day, PutDayApiRequest } from '../types';
import { putDaySuccess, putDayFailure } from '../actions';
import { pendingPutDay, clearPendingPutDay } from '../../../ui/days/actions';
import { put as putApi } from '../../../api';

const URL = `${process.env.API_BASE}/api/days`;

export default function* putSaga(action: PutDayApiRequest) {
    yield put(pendingPutDay(action.day.date));
    yield putApi(URL, successCallback, failCallback, action.day, action);
};

function* successCallback(day: Day) {
    console.log('Calling putDaySuccessCallback');
    yield put(putDaySuccess(day));
    yield put(clearPendingPutDay(day.date));
};

function* failCallback(code: number, json: object, actionPassThrough: Action) {
    console.log('Calling putDayFailCallback');
    const action = actionPassThrough as PutDayApiRequest;
    yield put(putDayFailure(code, action.day.date, json));
    yield put(clearPendingPutDay(action.day.date));
};