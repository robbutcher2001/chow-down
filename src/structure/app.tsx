import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from './homepage';
// import UnitsPage from './units-page';
// import IngredientsPage from './ingredients-page';
// import RecipesPage from './recipes-page';

export default () => (
    <BrowserRouter>
        <Switch>
            {/* <Route exact path='/units' component={UnitsPage} />
            <Route exact path='/ingredients' component={IngredientsPage} />
            <Route exact path='/recipes' component={RecipesPage} /> */}
            <Route exact path='/' component={Homepage} />
        </Switch>
    </BrowserRouter>
);