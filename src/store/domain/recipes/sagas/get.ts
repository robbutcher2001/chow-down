import { put } from 'redux-saga/effects';

import { pendingGetRecipesRequest, getRecipesSuccess, getRecipesFailure } from '../actions';
import { get } from '../../../api';

const URL = 'http://localhost:3000/api/recipes';

export default function* getSaga() {
    yield put(pendingGetRecipesRequest());
    yield get(URL, successCallback, failCallback);
};

function* successCallback(json: object) {
    console.log('Calling getRecipeSuccessCallback');
    yield put(getRecipesSuccess(json));
};

function* failCallback(code: number, json: object) {
    console.log('Calling getRecipeFailCallback');
    yield put(getRecipesFailure(code, json));
};