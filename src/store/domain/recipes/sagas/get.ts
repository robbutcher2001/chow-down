import { put } from 'redux-saga/effects';

import { Recipe } from '../types';
import { getRecipesSuccess, getRecipesFailure } from '../actions';
import { pendingGetRecipes, clearPendingGetRecipes } from '../../../ui/recipes/actions';
import { get } from '../../../api';

const URL = `${process.env.API_BASE}/api/recipes`;

export default function* getSaga() {
    yield put(pendingGetRecipes());
    yield get(URL, successCallback, failCallback);
};

function* successCallback(recipes: Recipe[]) {
    console.log('Calling getRecipeSuccessCallback');
    yield put(clearPendingGetRecipes());
    yield put(getRecipesSuccess(recipes));
};

function* failCallback(code: number, json: object) {
    console.log('Calling getRecipeFailCallback');
    yield put(clearPendingGetRecipes());
    yield put(getRecipesFailure(code, json));
};