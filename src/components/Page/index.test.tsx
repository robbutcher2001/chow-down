import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Page from '.';

test('Page basic snapshot render', () => {
  const page = renderer.create(
    <Router history={createMemoryHistory()}>
      <Page>
        <div>fake_child</div>
      </Page>
    </Router>
  );

  expect(page.toJSON()).toMatchSnapshot();
});

test('Page correct tag content assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <Page>
        <div>fake_child</div>
      </Page>
    </Router>
  );

  expect(getByText(/Your Week/).textContent).toEqual('Your Week');
  expect(getByText(/Recipes/).textContent).toEqual('Recipes');
  expect(getByText(/fake_child/).textContent).toEqual('fake_child');
  expect(getByText(/Chow Down/).textContent).toEqual('Chow Down');
  expect(getByText(/Chow down on/).textContent).toEqual('Chow down on a weekly plan of your evening meals.');
  expect(getByText(/Rob Butcher/).textContent).toEqual('© Rob Butcher 2020.');
  expect(getByText(/Images/).textContent).toEqual('Images: Unsplash and various recipe websites.');
});