import { put } from 'redux-saga/effects';

import { Recipe, PutRecipeUpdateApiRequest } from '../types';
import { putRecipeUpdateSuccess, putRecipeUpdateFailure } from '../actions';
import { pendingPutRecipes, clearPendingPutRecipes } from '../../../ui/recipes/actions';
import { put as putApi } from '../../../api';

const URL = `${process.env.API_BASE}/api/recipes`;

export default function* putSaga(action: PutRecipeUpdateApiRequest) {
    yield put(pendingPutRecipes());
    yield putApi(URL, successCallback, failCallback, action.recipe);
};

function* successCallback(recipes: Recipe[]) {
    console.log('Calling putRecipeUpdateSuccessCallback');
    yield put(putRecipeUpdateSuccess(recipes));
    yield put(clearPendingPutRecipes());
};

function* failCallback(code: number, json: object) {
    console.log('Calling putRecipeUpdateFailCallback');
    yield put(putRecipeUpdateFailure(code, json));
    yield put(clearPendingPutRecipes());
};