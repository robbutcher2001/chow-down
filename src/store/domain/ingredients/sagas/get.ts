import { put } from 'redux-saga/effects';

import { getIngredientsSuccess, getIngredientsFailure } from '../actions';
import { pendingGetIngredients, clearPendingGetIngredients } from '../../../ui/ingredients/actions';
import { get } from '../../../api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* getSaga() {
    yield put(pendingGetIngredients());
    yield get(URL, successCallback, failCallback);
    yield put(clearPendingGetIngredients());
};

function* successCallback(json: object) {
    console.log('Calling getIngredientSuccessCallback');
    yield put(getIngredientsSuccess(json));
};

function* failCallback(code: number, json: object) {
    console.log('Calling getIngredientFailCallback');
    yield put(getIngredientsFailure(code, json));
};