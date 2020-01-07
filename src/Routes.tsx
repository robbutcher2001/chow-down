import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import Page from './components/page';

import HomePage from './pages/homepage';
import RecipesPage from './pages/recipes';
import UnitsPage from './pages/units';
import IngredientsPage from './pages/ingredients';
import SettingsPage from './pages/settings';
import NotFoundPage from './pages/not_found';

const Routes: FunctionComponent = () => (
    <Page>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/recipes' component={RecipesPage} />
            <Route exact path='/units' component={UnitsPage} />
            <Route exact path='/ingredients' component={IngredientsPage} />
            <Route exact path='/settings' component={SettingsPage} />
            <Route path='*' component={NotFoundPage} />
        </Switch>
    </Page>
);

export default Routes;