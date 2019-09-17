import { put } from 'redux-saga/effects';

import { getRecipesSuccess, getRecipesFailure } from '../actions';
import { pendingGetRecipes, clearPendingGetRecipes } from '../../../ui/recipes/actions';
import { get } from '../../../api';

const URL = 'http://localhost:3000/api/recipes';

export default function* getSaga() {
    yield put(pendingGetRecipes());
    yield get(URL, successCallback, failCallback);
    yield put(clearPendingGetRecipes());
};

function* successCallback(json: object) {
    console.log('Calling getRecipeSuccessCallback');
    yield put(getRecipesSuccess(json));
};

function* failCallback(code: number, json: object) {
    console.log('Calling getRecipeFailCallback');
    yield put(getRecipesFailure(code, json));
};