import { call, put, takeLatest } from 'redux-saga/effects';

import post from './post';

const URL = 'http://localhost:3000/api/ingredient';

export default function* watcherSaga() {
    yield takeLatest('PUT_INGREDIENT_REQUEST', workerSaga);
}

function* workerSaga({ payload }) {
    try {
        yield put({ type: 'PUT_INGREDIENT_REQUEST_PENDING' });

        const response = yield call(() => post(URL, payload));

        if (response.status === 200) {
            const json = yield response.json();
            yield put({
                type: 'PUT_INGREDIENT_SUCCESS',
                payload: json
            });
            yield put({ type: 'GET_INGREDIENTS_REQUEST' });
        }
        else {
            throw response;
        }
    } catch (err) {
        if (err.status >= 400 && err.status < 500) {
            const json = yield err.json();
            yield put({
                type: 'PUT_INGREDIENT_FAILED',
                payload: json
            });

            return;
        }

        //TODO: migrate this so what ever this returns, the reducer gives a useful message back to the components
        yield put({
            type: 'PUT_INGREDIENT_FAILED',
            payload: err.statusText
        });
    }
}