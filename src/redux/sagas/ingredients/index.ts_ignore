'use strict';

import { all, takeLatest } from 'redux-saga/effects';

import { Actions } from '../../../globals/constants';

import getSaga from './get';
import postSaga from './post';

export default function* watcherSaga() {
    console.log('[saga] Started ingredients saga');
    yield all([
        takeLatest(Actions.ingredients.GET_INGREDIENTS_REQUEST, getSaga),
        takeLatest(Actions.ingredients.POST_INGREDIENT_REQUEST, postSaga)
    ]);
}