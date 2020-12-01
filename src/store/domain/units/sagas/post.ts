import { put } from 'redux-saga/effects';

import { Unit, PostUnitApiRequest } from '../types';
import { postUnitsSuccess, postUnitsFailure } from '../actions';
import { pendingPostUnits, clearPendingPostUnits } from '../../../ui/units/actions';
import { post } from '../../../api';

const URL = `${process.env.API_BASE}/api/units`;

export default function* postSaga(action: PostUnitApiRequest) {
    yield put(pendingPostUnits());
    yield post(URL, successCallback, failCallback, action.unit);
};

function* successCallback(units: Unit[]) {
    console.log('Calling postUnitSuccessCallback');
    yield put(postUnitsSuccess(units));
    yield put(clearPendingPostUnits());
};

function* failCallback(code: number, json: object) {
    console.log('Calling postUnitFailCallback');
    yield put(postUnitsFailure(code, json));
    yield put(clearPendingPostUnits());
};