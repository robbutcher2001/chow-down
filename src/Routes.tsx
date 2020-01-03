import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage';
import UnitsPage from './pages/units';
import IngredientsPage from './pages/ingredients';
import RecipesPage from './pages/recipes';
import NotFoundPage from './pages/not_found';

// TODO: SFC is deprecated
const Routes: SFC = () => (
    <Switch>
        <Route exact path='/units' component={UnitsPage} />
        <Route exact path='/ingredients' component={IngredientsPage} />
        <Route exact path='/recipes' component={RecipesPage} />
        <Route exact path='/' component={HomePage} />
        <Route path='*' component={NotFoundPage} />
    </Switch>
);

export default Routes;