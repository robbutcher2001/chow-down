'use strict';

import { all, takeLatest } from 'redux-saga/effects';

import { Actions } from '../../../globals/constants';

import getSaga from './get';
import postSaga from './post';

export default function* watcherSaga() {
    console.log('[saga] Started recipes saga');
    yield all([
        takeLatest(Actions.recipes.GET_RECIPES_REQUEST, getSaga),
        takeLatest(Actions.recipes.POST_RECIPE_REQUEST, postSaga)
    ]);
}