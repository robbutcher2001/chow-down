'use strict';

import { all, put, takeLatest } from 'redux-saga/effects';

import { get, post } from './api';

const URL = 'http://localhost:3000/api/units';

export default function* watcherSaga() {
    console.log('[saga] Started units saga');
    yield all([
        takeLatest('GET_UNITS_REQUEST', getSaga),
        takeLatest('POST_UNIT_REQUEST', postSaga)
    ]);
}

function* getSaga() {
    yield put({ type: 'GET_UNITS_REQUEST_PENDING' });
    yield get(URL, successCallbackGet, failCallbackGet);
}

function* successCallbackGet(payload) {
    console.log('Calling successCallback');
    yield put({
        type: 'GET_UNITS_SUCCESS',
        payload
    });
}

function* failCallbackGet(payload) {
    console.log('Calling failCallback');
    yield put({
        type: 'GET_UNITS_FAILED',
        payload
    });
}

function* postSaga({ payload }) {
    yield put({ type: 'POST_UNIT_REQUEST_PENDING' });
    yield post(URL, payload, successCallbackPost, failCallbackPost);
}

function* successCallbackPost(payload) {
    console.log('Calling successCallback');
    yield put({
        type: 'POST_UNIT_SUCCESS',
        payload
    });
    yield put({ type: 'GET_UNITS_REQUEST' });
}

function* failCallbackPost(payload) {
    console.log('Calling failCallback');
    yield put({
        type: 'POST_UNIT_FAILED',
        payload
    });
}