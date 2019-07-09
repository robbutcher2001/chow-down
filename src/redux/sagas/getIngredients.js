import { put, takeLatest } from 'redux-saga/effects';

import { get } from './api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* watcherSaga() {
    yield takeLatest('GET_INGREDIENTS_REQUEST', workerSaga);
}

function* workerSaga() {
    yield put({ type: 'GET_INGREDIENTS_REQUEST_PENDING' });
    yield get(URL, successCallback, failCallback);
}

function* successCallback(payload) {
    console.log('Calling successCallback');
    yield put({
        type: 'GET_INGREDIENTS_SUCCESS',
        payload
    });
}

function* failCallback(payload) {
    console.log('Calling failCallback');
    yield put({
        type: 'POST_INGREDIENT_FAILED',
        payload
    });
}