import { put, take, actionChannel, delay } from 'redux-saga/effects';

import { Recipe, PutRecipeUpdateTagApiRequest, RecipeActionTypes } from '../types';
import { putRecipeUpdateTagSuccess, putRecipeUpdateTagFailure, clearRecipeUpdateTagFailure } from '../actions';
import { pendingPutRecipeTag, clearPendingPutRecipeTag } from '../../../ui/recipes/actions';
import { put as putApi } from '../../../api';

const URL = `${process.env.API_BASE}/api/recipes`;

export default function* putRecipeTagSaga(action: PutRecipeUpdateTagApiRequest) {
  yield put(clearRecipeUpdateTagFailure(action.updatedTagId));
  yield put(pendingPutRecipeTag(action.updatedTagId));
  yield put({
    ...action,
    type: RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_QUEUE_REQUEST
  });
};

export function* queuePutRecipeTagSaga() {
    const requestChannel = yield actionChannel(RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_QUEUE_REQUEST);
    while (true) {
      const action: PutRecipeUpdateTagApiRequest = yield take(requestChannel);
      yield putApi(URL, successCallback, failCallback, action.recipe, action.updatedTagId);
      // TODO: fix in backend - db call is too delayed for quick calls to adding recipe tags
      yield delay(2000);
    }
};

function* successCallback(recipe: Recipe, ...updatedTagIds: string[]) {
    console.log('Calling putRecipeUpdateTagSuccessCallback');
    for (let i = 0; i < updatedTagIds.length; i++) {
      yield put(putRecipeUpdateTagSuccess(recipe, updatedTagIds[i]));
      yield put(clearPendingPutRecipeTag(updatedTagIds[i]));
    }
};

function* failCallback(code: number, json: object, ...updatedTagIds: string[]) {
    console.log('Calling putRecipeUpdateTagFailCallback');
    for (let i = 0; i < updatedTagIds.length; i++) {
      yield put(putRecipeUpdateTagFailure(code, updatedTagIds[i], json));
      yield put(clearPendingPutRecipeTag(updatedTagIds[i]));
    }
};