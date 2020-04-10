import { put } from 'redux-saga/effects';

import { Day } from '../types';
import { getDaysSuccess, getDaysFailure } from '../actions';
import { pendingGetDays, clearPendingGetDays } from '../../../ui/days/actions';
import { get } from '../../../api';

const URL = `${process.env.API_BASE}/api/days?from=date&to=date`;

export default function* getSaga() {
    yield put(pendingGetDays());
    yield get(URL, successCallback, failCallback);
};

function* successCallback(days: Day[]) {
    console.log('Calling getDaySuccessCallback');
    yield put(clearPendingGetDays());
    yield put(getDaysSuccess(days));
};

function* failCallback(code: number, json: object) {
    console.log('Calling getDayFailCallback');
    yield put(clearPendingGetDays());
    yield put(getDaysFailure(code, json));
};