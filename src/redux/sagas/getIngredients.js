import { call, put, takeLatest } from 'redux-saga/effects';

import { get } from './api';

const URL = 'http://localhost:3000/api/ingredients';

export default function* watcherSaga() {
    yield takeLatest('GET_INGREDIENTS_REQUEST', workerSaga);
}

function* workerSaga() {
    try {
        yield put({ type: 'GET_INGREDIENTS_REQUEST_PENDING' });

        const response = yield call(() => get(URL));

        if (response.status === 200) {
            const payload = yield response.json();
            yield put({
                type: 'GET_INGREDIENTS_SUCCESS',
                payload
            });
        }
        else {
            throw response;
        }
    } catch (error) {
        console.error(error);
    }
}