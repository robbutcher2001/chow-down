import { put } from 'redux-saga/effects';

import { Day, PutDayApiRequest } from '../types';
import { putDaysSuccess, putDaysFailure } from '../actions';
import { pendingPutDays, clearPendingPutDays } from '../../../ui/days/actions';
import { put as putApi } from '../../../api';

const URL = `${process.env.API_BASE}/api/days`;

export default function* putSaga(action: PutDayApiRequest) {
    yield put(pendingPutDays());
    yield putApi(URL, successCallback, failCallback, action.day);
};

function* successCallback(day: Day) {
    console.log('Calling putDaySuccessCallback');
    yield put(clearPendingPutDays());
    yield put(putDaysSuccess(day));
};

function* failCallback(code: number, json: object) {
    console.log('Calling putDayFailCallback');
    yield put(clearPendingPutDays());
    yield put(putDaysFailure(code, json));
};