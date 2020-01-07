import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import Page from './components/page';

import Home from './pages/home';
import Recipes from './pages/recipes';
import Units from './pages/units';
import Ingredients from './pages/ingredients';
import Settings from './pages/settings';
import NotFound from './pages/not_found';

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