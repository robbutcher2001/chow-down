import { all, takeEvery } from 'redux-saga/effects';

import { DayActionTypes } from '../types';

import getSaga from './get';
import putSaga from './put';

export default function* daysSaga() {
    console.log('[saga] Started days saga');
    yield all([
        takeEvery(DayActionTypes.GET_DAY_REQUEST, getSaga),
        takeEvery(DayActionTypes.PUT_DAY_REQUEST, putSaga)
    ]);
}