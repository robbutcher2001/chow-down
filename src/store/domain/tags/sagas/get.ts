import { put } from 'redux-saga/effects';

import { Tag } from '../types';
import { getTagsSuccess, getTagsFailure } from '../actions';
import { pendingGetTags, clearPendingGetTags } from '../../../ui/tags/actions';
import { get } from '../../../api';

const URL = `${process.env.API_BASE}/api/tags`;

export default function* getSaga() {
  yield put(pendingGetTags());
  yield get(URL, successCallback, failCallback);
};

function* successCallback(tags: Tag[]) {
  console.log('Calling getTagSuccessCallback');
  yield put(getTagsSuccess(tags));
  yield put(clearPendingGetTags());
};

function* failCallback(code: number, json: object) {
  console.log('Calling getTagFailCallback');
  yield put(getTagsFailure(code, json));
  yield put(clearPendingGetTags());
};