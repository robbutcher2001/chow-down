import { call, put, takeLatest } from 'redux-saga/effects';

const URL = 'http://localhost:3000/api/recipes';

export default function* watcherSaga() {
    yield takeLatest('GET_RECIPES_REQUEST', workerSaga);
}

function* workerSaga() {
    try {
        const payload = yield call(() => fetch(URL).then(data => data.json()));
        yield put({
            type: 'GET_RECIPES_SUCCESS',
            payload
        });
    } catch (error) {
        console.error(error);
    }
}