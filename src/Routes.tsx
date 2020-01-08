import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import Page from './components/Page';

import Home from './pages/temp/Home';
import Recipes from './pages/temp/Recipes';
import Units from './pages/temp/Units';
import Ingredients from './pages/temp/Ingredients';
import Settings from './pages/temp/Settings';
import NotFound from './pages/temp/NotFound';

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