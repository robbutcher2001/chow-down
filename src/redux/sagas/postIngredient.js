'use strict';

import { put, takeLatest } from 'redux-saga/effects';

import { post } from './api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* watcherSaga() {
    yield takeLatest('POST_INGREDIENT_REQUEST', postSaga);
}

function* postSaga({ payload }) {
    yield put({ type: 'POST_INGREDIENT_REQUEST_PENDING' });
    yield post(URL, payload, successCallback, failCallback);
}

function* successCallback(payload) {
    console.log('Calling successCallback');
    yield put({
        type: 'POST_INGREDIENT_SUCCESS',
        payload
    });
    yield put({ type: 'GET_INGREDIENTS_REQUEST' });
}

function* failCallback(payload) {
    console.log('Calling failCallback');
    yield put({
        type: 'POST_INGREDIENT_FAILED',
        payload
    });
}