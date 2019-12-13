import { put } from 'redux-saga/effects';

import { PostUnitApiRequest } from '../types';
import { getUnitsRequest, postUnitsSuccess, postUnitsFailure } from '../actions';
import { pendingPostUnits, clearPendingPostUnits } from '../../../ui/units/actions';
import { post } from '../../../api';

const URL = `${process.env.API_BASE}/api/units`;

export default function* postSaga(action: PostUnitApiRequest) {
    yield put(pendingPostUnits());
    yield post(URL, successCallback, failCallback, action.payload);
    yield put(clearPendingPostUnits());
};

function* successCallback(json: object) {
    console.log('Calling postUnitSuccessCallback');
    yield put(postUnitsSuccess(json));
    yield put(getUnitsRequest());
};

function* failCallback(code: number, json: object) {
    console.log('Calling postUnitFailCallback');
    yield put(postUnitsFailure(code, json));
};