'use strict';

import { put } from 'redux-saga/effects';

import { Actions } from '../../../globals/constants';
import { post } from '../api';

const URL = 'http://localhost:3000/api/recipes';

export default function* postSaga({ payload }) {
    yield put({ type: Actions.recipes.POST_RECIPE_REQUEST_PENDING });
    yield post(URL, payload, successCallback, failCallback);
}

function* successCallback(payload) {
    console.log('Calling successCallback');
    yield put({
        type: Actions.recipes.POST_RECIPE_SUCCESS,
        payload
    });
}

function* failCallback(payload) {
    console.log('Calling failCallback');
    yield put({
        type: Actions.recipes.POST_RECIPE_FAILED,
        payload
    });
}