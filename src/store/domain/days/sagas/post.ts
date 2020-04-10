import { put } from 'redux-saga/effects';

import { Day, PostDayApiRequest } from '../types';
import { postDaysSuccess, postDaysFailure } from '../actions';
import { pendingPostDays, clearPendingPostDays } from '../../../ui/days/actions';
import { post } from '../../../api';

const URL = `${process.env.API_BASE}/api/days`;

export default function* postSaga(action: PostDayApiRequest) {
    yield put(pendingPostDays());
    yield post(URL, successCallback, failCallback, action.day);
};

function* successCallback(days: Day[]) {
    console.log('Calling postDaySuccessCallback');
    yield put(clearPendingPostDays());
    yield put(postDaysSuccess(days));
};

function* failCallback(code: number, json: object) {
    console.log('Calling postDayFailCallback');
    yield put(clearPendingPostDays());
    yield put(postDaysFailure(code, json));
};