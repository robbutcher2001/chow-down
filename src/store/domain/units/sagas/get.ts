import { put } from 'redux-saga/effects';

import { getUnitsSuccess, getUnitsFailure } from '../actions';
import { pendingGetUnits, clearPendingGetUnits } from '../../../ui/units/actions';
import { get } from '../../../api';

const URL = 'http://localhost:3000/api/units';

export default function* getSaga() {
    yield put(pendingGetUnits());
    yield get(URL, successCallback, failCallback);
    yield put(clearPendingGetUnits());
};

function* successCallback(json: object) {
    console.log('Calling getUnitSuccessCallback');
    yield put(getUnitsSuccess(json));
};

function* failCallback(code: number, json: object) {
    console.log('Calling getUnitFailCallback');
    yield put(getUnitsFailure(code, json));
};