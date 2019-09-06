import { put, all, takeLatest } from 'redux-saga/effects';

import { CountActionTypes, CountApiRequest } from './types';
import { incrementSuccess, incrementFailure, decrementSuccess, decrementFailure } from './actions';
import { post } from '../../apiClient';

const URL = 'http://localhost:3030/api/counter';

function* incrementSaga(action: CountApiRequest) {
    yield post(URL, incrementSuccessCallback, incrementFailCallback, action.payload);
}

function* incrementSuccessCallback(json: object) {
    console.log('Calling incrementSuccessCallback');
    yield put(incrementSuccess(json));
}

function* incrementFailCallback(reason: string) {
    console.log('Calling incrementFailCallback');
    yield put(incrementFailure(reason));
}

function* decrementSaga(action: CountApiRequest) {
    yield post(URL, decrementSuccessCallback, decrementFailCallback, action.payload);
}

function* decrementSuccessCallback(json: object) {
    console.log('Calling decrementSuccessCallback');
    yield put(decrementSuccess(json));
}

function* decrementFailCallback(reason: string) {
    console.log('Calling decrementFailCallback');
    yield put(decrementFailure(reason));
}

export function* countSaga() {
    console.log('[saga] Started count saga');
    yield all([
        takeLatest(CountActionTypes.INCREMENT_REQUEST, incrementSaga),
        takeLatest(CountActionTypes.DECREMENT_REQUEST, decrementSaga)
    ]);
}