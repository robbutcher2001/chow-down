import { put } from 'redux-saga/effects';

import { Unit } from '../types';
import { getUnitsSuccess, getUnitsFailure } from '../actions';
import { pendingGetUnits, clearPendingGetUnits } from '../../../ui/units/actions';
import { get } from '../../../api';

const URL = `${process.env.API_BASE}/api/units`;

export default function* getSaga() {
    yield put(pendingGetUnits());
    yield get(URL, successCallback, failCallback);
};

function* successCallback(units: Unit[]) {
    console.log('Calling getUnitSuccessCallback');
    yield put(getUnitsSuccess(units));
    yield put(clearPendingGetUnits());
};

function* failCallback(code: number, json: object) {
    console.log('Calling getUnitFailCallback');
    yield put(getUnitsFailure(code, json));
    yield put(clearPendingGetUnits());
};