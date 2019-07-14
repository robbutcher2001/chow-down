'use strict';

import { all, fork } from 'redux-saga/effects';

import units from './units';
import ingredients from './ingredients';
import recipes from './recipes';

export default function* rootSaga() {
    yield all([
        fork(units),
        fork(ingredients),
        fork(recipes)
    ]);

    console.log('[rootSaga] App started');
}