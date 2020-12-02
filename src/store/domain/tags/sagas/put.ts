import { put } from 'redux-saga/effects';

import { Tag, PutTagApiRequest } from '../types';
import { putTagsSuccess, putTagsFailure } from '../actions';
import { pendingPutTags, clearPendingPutTags } from '../../../ui/tags/actions';
import { put as putApi } from '../../../api';

const URL = `${process.env.API_BASE}/api/tags`;

export default function* putSaga(action: PutTagApiRequest) {
  yield put(pendingPutTags());
  yield putApi(URL, successCallback, failCallback, action.tag);
};

function* successCallback(tags: Tag[]) {
  console.log('Calling putTagSuccessCallback');
  yield put(putTagsSuccess(tags));
  yield put(clearPendingPutTags());
};

function* failCallback(code: number, json: object) {
  console.log('Calling putTagFailCallback');
  yield put(putTagsFailure(code, json));
  yield put(clearPendingPutTags());
};