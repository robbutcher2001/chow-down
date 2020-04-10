import { put } from 'redux-saga/effects';

import { Day, GetDaysApiRequest } from '../types';
import { getDaysSuccess, getDaysFailure } from '../actions';
import { pendingGetDays, clearPendingGetDays } from '../../../ui/days/actions';
import { get } from '../../../api';

const URL = `${process.env.API_BASE}/api/days`;

export default function* getSaga(action: GetDaysApiRequest) {
    yield put(pendingGetDays());
    yield get(`${URL}?from=${action.from}&to=${action.to}`, successCallback, failCallback);
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