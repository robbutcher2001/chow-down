import { put } from 'redux-saga/effects';

import { Ingredient } from '../types';
import { getIngredientsSuccess, getIngredientsFailure } from '../actions';
import { pendingGetIngredients, clearPendingGetIngredients } from '../../../ui/ingredients/actions';
import { get } from '../../../api';

const URL = `${process.env.API_BASE}/api/ingredients`;

export default function* getSaga() {
    yield put(pendingGetIngredients());
    yield get(URL, successCallback, failCallback);
};

function* successCallback(ingredients: Ingredient[]) {
    console.log('Calling getIngredientSuccessCallback');
    yield put(clearPendingGetIngredients());
    yield put(getIngredientsSuccess(ingredients));
};

function* failCallback(code: number, json: object) {
    console.log('Calling getIngredientFailCallback');
    yield put(clearPendingGetIngredients());
    yield put(getIngredientsFailure(code, json));
};