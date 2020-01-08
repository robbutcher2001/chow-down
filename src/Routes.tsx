import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import Page from './components/Page';

import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Units from './pages/Units';
import Ingredients from './pages/Ingredients';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const Routes: FunctionComponent = () => (
    <Page>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/recipes' component={Recipes} />
            <Route exact path='/units' component={Units} />
            <Route exact path='/ingredients' component={Ingredients} />
            <Route exact path='/settings' component={Settings} />
            <Route path='*' component={NotFound} />
        </Switch>
    </Page>
);

export default Routes;