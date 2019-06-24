import { all, fork } from 'redux-saga/effects';

import getIngredients from './getIngredients';
import putIngredient from './putIngredient';

export default function* rootSaga() {
    yield all([
        //fork all so we can add more here later
        fork(getIngredients),
        fork(putIngredient)
    ]);

    console.log('[rootSaga] App started');
}