import { put } from 'redux-saga/effects';

import { Ingredient, PostIngredientApiRequest } from '../types';
import { postIngredientsSuccess, postIngredientsFailure } from '../actions';
import { pendingPostIngredients, clearPendingPostIngredients } from '../../../ui/ingredients/actions';
import { post } from '../../../api';

const URL = `${process.env.API_BASE}/api/ingredients`;

export default function* postSaga(action: PostIngredientApiRequest) {
    yield put(pendingPostIngredients());
    yield post(URL, successCallback, failCallback, action.ingredient);
};

function* successCallback(ingredients: Ingredient[]) {
    console.log('Calling postIngredientSuccessCallback');
    yield put(postIngredientsSuccess(ingredients));
    yield put(clearPendingPostIngredients());
};

function* failCallback(code: number, json: object) {
    console.log('Calling postIngredientFailCallback');
    yield put(postIngredientsFailure(code, json));
    yield put(clearPendingPostIngredients());
};