'use strict';

import { put } from 'redux-saga/effects';

import { Actions } from '../../../globals/constants';
import { get } from '../api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* getSaga() {
    yield put({ type: Actions.ingredients.GET_INGREDIENTS_REQUEST_PENDING });
    yield get(URL, successCallback, failCallback);
}

function* successCallback(payload) {
    console.log('Calling successCallback');
    yield put({
        type: Actions.ingredients.GET_INGREDIENTS_SUCCESS,
        payload
    });
}

function* failCallback(payload) {
    console.log('Calling failCallback');
    yield put({
        type: Actions.ingredients.GET_INGREDIENT_FAILED,
        payload
    });
}