import { all, fork } from 'redux-saga/effects';

import getIngredients from './getIngredients';

export default function* rootSaga() {
    yield all([
        //fork all so we can add more here later
        fork(getIngredients)
    ]);

    console.log('[rootSaga] App started');
}