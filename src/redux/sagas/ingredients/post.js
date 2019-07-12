'use strict';

import { put } from 'redux-saga/effects';

import { Actions } from '../../../globals/constants';
import { post } from '../api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* postSaga({ payload }) {
    yield put({ type: Actions.ingredients.POST_INGREDIENT_REQUEST_PENDING });
    yield post(URL, payload, successCallback, failCallback);
}

function* successCallback(payload) {
    console.log('Calling successCallback');
    yield put({
        type: Actions.ingredients.POST_INGREDIENT_SUCCESS,
        payload
    });
    yield put({ type: Actions.ingredients.GET_INGREDIENTS_REQUEST });
}

function* failCallback(payload) {
    console.log('Calling failCallback');
    yield put({
        type: Actions.ingredients.POST_INGREDIENT_FAILED,
        payload
    });
}