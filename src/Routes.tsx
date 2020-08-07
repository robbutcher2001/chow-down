import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import Page from './components/Page';
import ScrollTop from './components/ScrollTop';

import Days from './views/Days';
import Day from './views/Day';
import Recipes from './views/Recipes';
import Recipe from './views/Recipe';
import NewAlternateDay from './views/NewAlternateDay';
import NewRecipe from './views/NewRecipe';
import NewUnit from './views/NewUnit';
import NewIngredient from './views/NewIngredient';
import Settings from './views/Settings';
import NotFound from './views/NotFound';

const Routes: FunctionComponent = () => (
  <Page>
    <ScrollTop>
      <Switch>
        <Route exact path='/' component={Days} />
        <Route exact path='/days/:date' component={Day} />
        <Route exact path='/recipes' component={Recipes} />
        <Route exact path='/recipe/:id' component={Recipe} />
        <Route exact path='/days/alternate/new' component={NewAlternateDay} />
        <Route exact path='/recipes/new' component={NewRecipe} />
        <Route exact path='/units/new' component={NewUnit} />
        <Route exact path='/ingredients/new' component={NewIngredient} />
        <Route exact path='/settings' component={Settings} />
        <Route path='*' component={NotFound} />
      </Switch>
    </ScrollTop>
  </Page>
);

export default Routes;