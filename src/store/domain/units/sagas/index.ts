import { all, takeLatest } from 'redux-saga/effects';

import { UnitActionTypes } from '../types';

import getSaga from './get';
import postSaga from './post';

export default function* unitsSaga() {
    console.log('[saga] Started units saga');
    yield all([
        takeLatest(UnitActionTypes.GET_UNITS_REQUEST, getSaga),
        takeLatest(UnitActionTypes.POST_UNITS_REQUEST, postSaga)
    ]);
}