import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { RecipeActionTypes } from '../types';

import getSaga from './get';
import postSaga from './post';
import putRecipeTagSaga, { queuePutRecipeTagSaga } from './putRecipeTag';

export default function* recipesSaga() {
    console.log('[saga] Started recipes saga');
    yield all([
        takeLatest(RecipeActionTypes.GET_RECIPES_REQUEST, getSaga),
        takeLatest(RecipeActionTypes.POST_RECIPE_REQUEST, postSaga),
        takeEvery(RecipeActionTypes.PUT_RECIPE_UPDATE_TAG_REQUEST, putRecipeTagSaga),
        queuePutRecipeTagSaga()
    ]);
}