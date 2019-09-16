'use strict';

import { all, takeLatest } from 'redux-saga/effects';

import { Actions } from '../../../globals/constants';

import getSaga from './get';
import postSaga from './post';

export default function* watcherSaga() {
    console.log('[saga] Started units saga');
    yield all([
        takeLatest(Actions.units.GET_UNITS_REQUEST, getSaga),
        takeLatest(Actions.units.POST_UNIT_REQUEST, postSaga)
    ]);
}