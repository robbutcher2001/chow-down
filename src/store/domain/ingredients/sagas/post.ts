import { put } from 'redux-saga/effects';

import { PostIngredientApiRequest } from '../types';
import { getIngredientsRequest, postIngredientsSuccess, postIngredientsFailure } from '../actions';
import { pendingPostIngredients, clearPendingPostIngredients } from '../../../ui/ingredients/actions';
import { post } from '../../../api';

const URL = `${process.env.API_BASE}/api/ingredients`;

export default function* postSaga(action: PostIngredientApiRequest) {
    yield put(pendingPostIngredients());
    yield post(URL, successCallback, failCallback, action.payload);
};

function* successCallback(json: object) {
    console.log('Calling postIngredientSuccessCallback');
    yield put(clearPendingPostIngredients());
    yield put(postIngredientsSuccess(json));
    yield put(getIngredientsRequest());
};

function* failCallback(code: number, json: object) {
    console.log('Calling postIngredientFailCallback');
    yield put(clearPendingPostIngredients());
    yield put(postIngredientsFailure(code, json));
};