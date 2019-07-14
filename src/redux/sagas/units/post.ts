'use strict';

import { put } from 'redux-saga/effects';

import { Actions } from '../../../globals/constants';
import { post } from '../api';

const URL = 'http://localhost:3000/api/units';

export default function* postSaga({ payload }) {
    yield put({ type: Actions.units.POST_UNIT_REQUEST_PENDING });
    yield post(URL, payload, successCallback, failCallback);
}

function* successCallback(payload) {
    console.log('Calling successCallback');
    yield put({
        type: Actions.units.POST_UNIT_SUCCESS,
        payload
    });
    yield put({ type: Actions.units.GET_UNITS_REQUEST });
}

function* failCallback(payload) {
    console.log('Calling failCallback');
    yield put({
        type: Actions.units.POST_UNIT_FAILED,
        payload
    });
}