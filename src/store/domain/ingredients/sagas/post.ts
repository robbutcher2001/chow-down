import { put } from 'redux-saga/effects';

import { PostIngredientApiRequest } from '../types';
import { getIngredientsRequest, pendingPostIngredientsRequest, postIngredientsSuccess, postIngredientsFailure } from '../actions';
import { post } from '../../../api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* postSaga(action: PostIngredientApiRequest) {
    yield put(pendingPostIngredientsRequest());
    yield post(URL, successCallback, failCallback, action.payload);
};

function* successCallback(json: object) {
    console.log('Calling postIngredientSuccessCallback');
    yield put(postIngredientsSuccess(json));
    yield put(getIngredientsRequest());
};

function* failCallback(reason: string) {
    console.log('Calling postIngredientFailCallback');
    yield put(postIngredientsFailure(reason));
};