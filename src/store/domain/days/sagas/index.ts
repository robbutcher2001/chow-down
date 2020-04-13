import { all, takeLatest } from 'redux-saga/effects';

import { DayActionTypes } from '../types';

import getSaga from './get';
import putSaga from './put';

export default function* daysSaga() {
    console.log('[saga] Started days saga');
    yield all([
        takeLatest(DayActionTypes.GET_DAYS_REQUEST, getSaga),
        takeLatest(DayActionTypes.PUT_DAYS_REQUEST, putSaga)
    ]);
}