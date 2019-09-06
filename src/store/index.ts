import { Store, createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { routerMiddleware, connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { DomainState } from './domain';
import { createDomainReducer } from './domain';
// import { UiState } from './ui';
// import { createUiReducer } from './ui';

import ingredientsSaga from './domain/ingredients/sagas';

export interface GlobalState {
    domain: DomainState,
    // ui: UiState,
    router: RouterState
}

const createRootReducer = (history: History) => combineReducers<GlobalState>({
    domain: createDomainReducer(),
    // ui: createUiReducer(),
    router: connectRouter(history)
});

function* createRootSaga() {
    yield all([
        fork(ingredientsSaga),
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