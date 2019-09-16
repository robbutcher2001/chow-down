import { all, takeLatest } from 'redux-saga/effects';

import { IngredientActionTypes } from '../types';

import getSaga from './get';
import postSaga from './post';

export default function* ingredientsSaga() {
    console.log('[saga] Started ingredients saga');
    yield all([
        takeLatest(IngredientActionTypes.GET_INGREDIENTS_REQUEST, getSaga),
        takeLatest(IngredientActionTypes.POST_INGREDIENTS_REQUEST, postSaga)
    ]);
}