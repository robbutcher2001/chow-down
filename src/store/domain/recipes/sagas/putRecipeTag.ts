import { Action } from 'redux';
import { put, take, actionChannel } from 'redux-saga/effects';

import { Recipe, PutRecipeUpdateTagApiRequest, RecipeActionTypes } from '../types';
import { putRecipeUpdateTagSuccess, putRecipeUpdateTagFailure, clearRecipeUpdateTagFailure } from '../actions';
import { pendingPutRecipeTag, clearPendingPutRecipeTag } from '../../../ui/recipes/actions';
import { put as putApi } from '../../../api';

const URL = `${process.env.API_BASE}/api/recipes`;

export default function* putRecipeTagSaga(action: PutRecipeUpdateTagApiRequest) {
  yield put(clearRecipeUpdateTagFailure(action.updatedTagId));
  yield put(pendingPutRecipeTag(action.recipe.id, action.updatedTagId));
  yield put({
    ...action,
    type: RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_QUEUE_REQUEST
  });
};

export function* queuePutRecipeTagSaga() {
    const requestChannel = yield actionChannel(RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_QUEUE_REQUEST);
    while (true) {
      const action: PutRecipeUpdateTagApiRequest = yield take(requestChannel);
      yield putApi(URL, successCallback, failCallback, action.recipe, action);
    }
};

function* successCallback(recipe: Recipe, actionPassThrough: Action) {
    console.log('Calling putRecipeUpdateTagSuccessCallback');
    const action = actionPassThrough as PutRecipeUpdateTagApiRequest;
    yield put(putRecipeUpdateTagSuccess(recipe, action.updatedTagId));
    yield put(clearPendingPutRecipeTag(recipe.id, action.updatedTagId));
};

function* failCallback(code: number, json: object, actionPassThrough: Action) {
    console.log('Calling putRecipeUpdateTagFailCallback');
    const action = actionPassThrough as PutRecipeUpdateTagApiRequest;
    yield put(putRecipeUpdateTagFailure(code, action.updatedTagId, json));
    yield put(clearPendingPutRecipeTag(action.recipe.id, action.updatedTagId));
};