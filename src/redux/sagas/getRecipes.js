'use strict';

import { call, put, takeLatest } from 'redux-saga/effects';

import { get } from './api';

const URL = 'http://localhost:3000/api/recipes';

export default function* watcherSaga() {
    yield takeLatest('GET_RECIPES_REQUEST', getSaga);
}

function* getSaga() {
    yield put({ type: 'GET_RECIPES_REQUEST_PENDING' });
    yield get(URL, successCallbackGet, failCallbackGet);
}

function* successCallbackGet(payload) {
    console.log('Calling successCallback');
    yield put({
        type: 'GET_RECIPES_SUCCESS',
        payload
    });
}

function* failCallbackGet(payload) {
    console.log('Calling failCallback');
    yield put({
        type: 'GET_RECIPES_FAILED',
        payload
    });
}