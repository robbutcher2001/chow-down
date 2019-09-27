import { put } from 'redux-saga/effects';

import { PostIngredientApiRequest } from '../types';
import { getIngredientsRequest, postIngredientsSuccess, postIngredientsFailure } from '../actions';
import { pendingPostIngredients, clearPendingPostIngredients } from '../../../ui/ingredients/actions';
import { post } from '../../../api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* postSaga(action: PostIngredientApiRequest) {
    yield put(pendingPostIngredients());
    yield post(URL, successCallback, failCallback, action.payload);
    yield put(clearPendingPostIngredients());
};

function* successCallback(json: object) {
    console.log('Calling postIngredientSuccessCallback');
    yield put(postIngredientsSuccess(json));
    yield put(getIngredientsRequest());
};

function* failCallback(code: number, json: object) {
    console.log('Calling postIngredientFailCallback');
    yield put(postIngredientsFailure(code, json));
};