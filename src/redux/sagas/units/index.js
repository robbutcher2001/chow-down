'use strict';

import { all, takeLatest } from 'redux-saga/effects';

import getSaga from './get';
import postSaga from './post';

export default function* watcherSaga() {
    console.log('[saga] Started units saga');
    yield all([
        takeLatest('GET_UNITS_REQUEST', getSaga),
        takeLatest('POST_UNIT_REQUEST', postSaga)
    ]);
}