import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage';
import UnitsPage from './pages/units';
import IngredientsPage from './pages/ingredients';
import RecipesPage from './pages/recipes';

const Routes: SFC = () => (
    <Switch>
        <Route path='/units' component={UnitsPage} />
        <Route path='/ingredients' component={IngredientsPage} />
        <Route path='/recipes' component={RecipesPage} />
        <Route path='/' component={HomePage} />
        <Route component={() => <h1>Page not found</h1>} />
    </Switch>
);

export default Routes;