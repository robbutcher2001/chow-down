import { call, put, takeLatest } from 'redux-saga/effects';

const URL = 'http://localhost:3000/api/ingredients';

export default function* watcherSaga() {
    yield takeLatest('GET_INGREDIENTS_REQUEST', workerSaga);
}

function* workerSaga() {
    try {
        yield put({ type: 'GET_INGREDIENTS_REQUEST_PENDING' });

        const payload = yield call(() => fetch(URL).then(data => data.json()));
        yield put({
            type: 'GET_INGREDIENTS_SUCCESS',
            payload
        });
    } catch (error) {
        console.error(error);
    }
}