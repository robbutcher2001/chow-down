import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import Page from './components/Page';
import ScrollTop from './components/ScrollTop';

import Days from './pages/Days';
import Day from './pages/Day';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import NewAlternateDay from './pages/NewAlternateDay';
import NewRecipe from './pages/NewRecipe';
import NewUnit from './pages/NewUnit';
import NewIngredient from './pages/NewIngredient';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

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