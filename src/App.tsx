import React, { FunctionComponent } from 'react';
import { Store } from 'redux';
import { History } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
//TODO: should the spinner be a SCSS component? move to styled-components and remove all scss refs, remove scss loader
import './spinner';

import { GlobalState } from './store';
import Routes from './Routes';

interface AppProps {
  store: Store<GlobalState>,
  history: History
}

const App: FunctionComponent<AppProps> = (props: AppProps) => (
  <Provider store={props.store}>
    <ConnectedRouter history={props.history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default App;