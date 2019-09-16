import { put } from 'redux-saga/effects';

import { PostUnitApiRequest } from '../types';
import { getUnitsRequest, pendingPostUnitsRequest, postUnitsSuccess, postUnitsFailure } from '../actions';
import { post } from '../../../api';

const URL = 'http://localhost:3000/api/units';

export default function* postSaga(action: PostUnitApiRequest) {
    yield put(pendingPostUnitsRequest());
    yield post(URL, successCallback, failCallback, action.payload);
};

function* successCallback(json: object) {
    console.log('Calling postUnitSuccessCallback');
    yield put(postUnitsSuccess(json));
    yield put(getUnitsRequest());
};

function* failCallback(reason: string) {
    console.log('Calling postUnitFailCallback');
    yield put(postUnitsFailure(reason));
};