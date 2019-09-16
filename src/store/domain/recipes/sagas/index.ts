import { all, takeLatest } from 'redux-saga/effects';

import { RecipeActionTypes } from '../types';

import getSaga from './get';
import postSaga from './post';

export default function* recipesSaga() {
    console.log('[saga] Started recipes saga');
    yield all([
        takeLatest(RecipeActionTypes.GET_RECIPES_REQUEST, getSaga),
        takeLatest(RecipeActionTypes.POST_RECIPES_REQUEST, postSaga)
    ]);
}