'use strict';

import { call, put, takeLatest } from 'redux-saga/effects';

import { post } from './api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* watcherSaga() {
    yield takeLatest('POST_INGREDIENT_REQUEST', workerSaga);
}

function* workerSaga({ payload }) {
    try {
        yield put({ type: 'POST_INGREDIENT_REQUEST_PENDING' });

        // const response = yield call(() => POST(
        //     URL,
        //     payload
        // ));

        yield* post(URL, payload);

    } catch (err) {
        console.log('wkenrjnwerjknwejkr');
        // console.log(err);
    }
}