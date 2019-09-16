import { put } from 'redux-saga/effects';

import { pendingGetUnitsRequest, getUnitsSuccess, getUnitsFailure } from '../actions';
import { get } from '../../../api';

const URL = 'http://localhost:3000/api/units';

export default function* getSaga() {
    yield put(pendingGetUnitsRequest());
    yield get(URL, successCallback, failCallback);
};

function* successCallback(json: object) {
    console.log('Calling getUnitSuccessCallback');
    yield put(getUnitsSuccess(json));
};

function* failCallback(code: number, json: object) {
    console.log('Calling getUnitFailCallback');
    yield put(getUnitsFailure(code, json));
};