import { call, put, takeLatest } from 'redux-saga/effects';

import { Method } from '../../globals/constants';
import api from '../../globals/api';

const URL = 'http://localhost:3000/api/units';

export default function* watcherSaga() {
    // yield takeLatest('GET_UNITS_REQUEST', test);
    yield takeLatest('POST_UNIT_REQUEST', workerSaga);
}

function* test() {
    try {
        yield put({ type: 'GET_UNITS_REQUEST_PENDING' });

        const payload = yield call(() => fetch(URL).then(data => data.json()));
        yield put({
            type: 'GET_UNITS_SUCCESS',
            payload
        });
    } catch (error) {
        console.error(error);
    }
}

function* workerSaga({ payload }) {
    try {
        yield put({ type: 'POST_UNIT_REQUEST_PENDING' });

        const response = yield call(() => api(
            Method.POST,
            URL,
            payload
        ));

        if (response.status === 200) {
            const json = yield response.json();
            yield put({
                type: 'POST_UNIT_SUCCESS',
                payload: json
            });
            yield put({ type: 'GET_UNITS_REQUEST' });
        }
        else {
            throw response;
        }
    } catch (err) {
        if (err.status >= 400 && err.status < 500) {
            const json = yield err.json();
            yield put({
                type: 'POST_UNIT_FAILED',
                payload: json
            });

            return;
        }

        //TODO: migrate this so what ever this returns, the reducer gives a useful message back to the components
        yield put({
            type: 'POST_UNIT_FAILED',
            payload: err.statusText
        });
    }
}