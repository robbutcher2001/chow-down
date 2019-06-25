import { call, put, takeLatest } from 'redux-saga/effects';

const URL = 'http://localhost:3000/api/ingredient';

export default function* watcherSaga() {
    yield takeLatest('PUT_INGREDIENT_REQUEST', workerSaga);
}

function* workerSaga({ payload }) {
    const ingredient = payload.ingredient;

    try {
        const response = yield call(() => fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                ingredient
            })
        }).then(data => data.json()));

        //TODO: errors and existing ingredients not yet handled
        yield put({
            type: 'PUT_INGREDIENT_SUCCESS',
            payload: response
        });
    } catch (error) {
        console.error(error);
    }
}