import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from './pages/homepage';
import IngredientsPage from './pages/ingredients';
import RecipesPage from './pages/recipes';

const Routes: SFC = () => (
    <Switch>
        <Route path='/ingredients' component={IngredientsPage} />
        <Route path='/recipes' component={RecipesPage} />
        <Route path='/' component={Homepage} />
        <Route component={() => <h1>Page not found</h1>} />
    </Switch>
);

export default Routes;