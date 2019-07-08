'use strict';

import { put, takeLatest } from 'redux-saga/effects';

import { post } from './api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* watcherSaga() {
    yield takeLatest('POST_INGREDIENT_REQUEST', workerSaga);
}

function* workerSaga({ payload }) {
    yield put({ type: 'POST_INGREDIENT_REQUEST_PENDING' });
    yield post(URL, payload);
    // yield put({ type: 'GET_INGREDIENTS_REQUEST' });
}