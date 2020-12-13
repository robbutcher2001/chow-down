import { put } from 'redux-saga/effects';

import { Recipe, PostRecipeApiRequest } from '../types';
import { postRecipeSuccess, postRecipeFailure } from '../actions';
import { pendingPostRecipe, clearPendingPostRecipe } from '../../../ui/recipes/actions';
import { post } from '../../../api';

const URL = `${process.env.API_BASE}/api/recipes`;

export default function* postSaga(action: PostRecipeApiRequest) {
    yield put(pendingPostRecipe());
    yield post(URL, successCallback, failCallback, action.recipe);
};

function* successCallback(recipe: Recipe) {
    console.log('Calling postRecipeSuccessCallback');
    yield put(postRecipeSuccess(recipe));
    yield put(clearPendingPostRecipe());
};

function* failCallback(code: number, json: object) {
    console.log('Calling postRecipeFailCallback');
    yield put(postRecipeFailure(code, json));
    yield put(clearPendingPostRecipe());
};