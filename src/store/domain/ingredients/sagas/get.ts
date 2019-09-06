import { put } from 'redux-saga/effects';

import { pendingGetIngredientsRequest, getIngredientsSuccess, getIngredientsFailure } from '../actions';
import { get } from '../../../api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* getSaga() {
    yield put(pendingGetIngredientsRequest());
    yield get(URL, successCallback, failCallback);
};

function* successCallback(json: object) {
    console.log('Calling getIngredientSuccessCallback');
    yield put(getIngredientsSuccess(json));
};

function* failCallback(reason: string) {
    console.log('Calling getIngredientFailCallback');
    yield put(getIngredientsFailure(reason));
};