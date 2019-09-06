import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import IngredientsPage from './pages/ingredients';

const Routes: SFC = () => (
    <Switch>
        <Route path='/ingredients' component={IngredientsPage} />
        <Route component={() => <h1>Page not found</h1>} />
    </Switch>
);

export default Routes;