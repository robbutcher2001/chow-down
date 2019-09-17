import { put } from 'redux-saga/effects';

import { PostRecipeApiRequest } from '../types';
import { getRecipesRequest, postRecipesSuccess, postRecipesFailure } from '../actions';
import { pendingPostRecipes, clearPendingPostRecipes } from '../../../ui/recipes/actions';
import { post } from '../../../api';

const URL = 'http://localhost:3000/api/recipes';

export default function* postSaga(action: PostRecipeApiRequest) {
    yield put(pendingPostRecipes());
    yield post(URL, successCallback, failCallback, action.payload);
    yield put(clearPendingPostRecipes());
};

function* successCallback(json: object) {
    console.log('Calling postRecipeSuccessCallback');
    yield put(postRecipesSuccess(json));
    yield put(getRecipesRequest());
};

function* failCallback(code: number, json: object) {
    console.log('Calling postRecipeFailCallback');
    yield put(postRecipesFailure(code, json));
};