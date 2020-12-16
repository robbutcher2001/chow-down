import { Action } from 'redux';
import { put } from 'redux-saga/effects';

import { Day, GetDayApiRequest } from '../types';
import { getDaySuccess, getDayFailure } from '../actions';
import { pendingGetDay, clearPendingGetDay } from '../../../ui/days/actions';
import { get } from '../../../api';

const URL = `${process.env.API_BASE}/api/days`;

export default function* getSaga(action: GetDayApiRequest) {
    yield put(pendingGetDay(action.date));
    yield get(`${URL}?from=${action.date}&to=${action.date}`, successCallback, failCallback, action);
};

// TODO: change this back to a success response from server of single day, not array of days as that's inline with rest of ui
function* successCallback(days: Day[], actionPassThrough: Action) {
    console.log('Calling getDaySuccessCallback');
    const action = actionPassThrough as GetDayApiRequest;
    yield put(getDaySuccess(action.date, days.find(day => day.date === action.date)));
    yield put(clearPendingGetDay(action.date));
};

function* failCallback(code: number, json: object, actionPassThrough: Action) {
    console.log('Calling getDayFailCallback');
    const action = actionPassThrough as GetDayApiRequest;
    yield put(getDayFailure(code, action.date, json));
    yield put(clearPendingGetDay(action.date));
};