import { all, takeLatest } from 'redux-saga/effects';

import { TagActionTypes } from '../types';

import getSaga from './get';
import putSaga from './put';

export default function* tagsSaga() {
  console.log('[saga] Started tags saga');
  yield all([
    takeLatest(TagActionTypes.GET_TAGS_REQUEST, getSaga),
    takeLatest(TagActionTypes.PUT_TAGS_REQUEST, putSaga)
  ]);
}