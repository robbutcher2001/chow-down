'use strict';

import { put } from 'redux-saga/effects';

import { post } from '../api';

const URL = 'http://localhost:3000/api/units';

export default function* postSaga({ payload }) {
    yield put({ type: 'POST_UNIT_REQUEST_PENDING' });
    yield post(URL, payload, successCallback, failCallback);
}

function* successCallback(payload) {
    console.log('Calling successCallback');
    yield put({
        type: 'POST_UNIT_SUCCESS',
        payload
    });
    yield put({ type: 'GET_UNITS_REQUEST' });
}

function* failCallback(payload) {
    console.log('Calling failCallback');
    yield put({
        type: 'POST_UNIT_FAILED',
        payload
    });
}