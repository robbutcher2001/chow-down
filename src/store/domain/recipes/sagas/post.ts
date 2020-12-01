import { put } from 'redux-saga/effects';

import { Recipe, PostRecipeApiRequest } from '../types';
import { postRecipesSuccess, postRecipesFailure } from '../actions';
import { pendingPostRecipes, clearPendingPostRecipes } from '../../../ui/recipes/actions';
import { post } from '../../../api';

const URL = `${process.env.API_BASE}/api/recipes`;

export default function* postSaga(action: PostRecipeApiRequest) {
    yield put(pendingPostRecipes());
    yield post(URL, successCallback, failCallback, action.recipe);
};

function* successCallback(recipes: Recipe[]) {
    console.log('Calling postRecipeSuccessCallback');
    yield put(postRecipesSuccess(recipes));
    yield put(clearPendingPostRecipes());
};

function* failCallback(code: number, json: object) {
    console.log('Calling postRecipeFailCallback');
    yield put(postRecipesFailure(code, json));
    yield put(clearPendingPostRecipes());
};