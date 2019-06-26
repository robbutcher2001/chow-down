import { all, fork } from 'redux-saga/effects';

import getIngredients from './getIngredients';
import putIngredient from './putIngredient';

import getRecipes from './getRecipes';

export default function* rootSaga() {
    yield all([
        //fork all so we can add more here later
        fork(getIngredients),
        fork(putIngredient),
        fork(getRecipes)
    ]);

    console.log('[rootSaga] App started');
}