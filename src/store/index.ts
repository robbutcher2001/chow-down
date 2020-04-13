import { Store, createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { routerMiddleware, connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { AppState } from './app';
import { createAppReducer } from './app';
import { DomainState } from './domain';
import { createDomainReducer } from './domain';
import { UiState } from './ui';
import { createUiReducer } from './ui';

import ingredientsSaga from './domain/ingredients/sagas';
import recipesSaga from './domain/recipes/sagas';
import unitsSaga from './domain/units/sagas';
import daysSaga from './domain/days/sagas';

export interface GlobalState {
    app: AppState,
    domain: DomainState,
    ui: UiState,
    router: RouterState
}

const createRootReducer = (history: History) => combineReducers<GlobalState>({
    app: createAppReducer(),
    domain: createDomainReducer(),
    ui: createUiReducer(),
    router: connectRouter(history)
});

function* createRootSaga() {
    yield all([
        fork(ingredientsSaga),
        fork(recipesSaga),
        fork(unitsSaga),
        fork(daysSaga)
    ]);

    console.log('[rootSaga] App started');
}

export const configureStore = (history: History): Store<GlobalState> => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        createRootReducer(history),
        applyMiddleware(routerMiddleware(history), sagaMiddleware)
    );

    sagaMiddleware.run(createRootSaga);

    return store;
};