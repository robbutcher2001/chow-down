'use strict';

import { all, takeLatest } from 'redux-saga/effects';

import getSaga from './get';
import postSaga from './post';

export default function* watcherSaga() {
    console.log('[saga] Started ingredients saga');
    yield all([
        takeLatest('GET_INGREDIENTS_REQUEST', getSaga),
        takeLatest('POST_INGREDIENT_REQUEST', postSaga)
    ]);
}