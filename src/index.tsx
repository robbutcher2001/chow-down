import React from 'react';
import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import OfflinePluginRuntime from 'offline-plugin/runtime';

import App from './App';
import { configureStore } from './store';

const history = createBrowserHistory();
const store = configureStore(history);

OfflinePluginRuntime.install();

ReactDOM.render(
    <App
        store={store}
        history={history}
    />
    , document.getElementById('mnt')
);