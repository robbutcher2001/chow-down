'use strict';

import { all, takeLatest } from 'redux-saga/effects';

import getSaga from './get';
import postSaga from './post';

export default function* watcherSaga() {
    console.log('[saga] Started recipes saga');
    yield all([
        takeLatest('GET_RECIPES_REQUEST', getSaga),
        takeLatest('POST_RECIPE_REQUEST', postSaga)
    ]);
}