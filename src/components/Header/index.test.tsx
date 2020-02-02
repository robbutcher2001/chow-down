import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from '.';

test('Header basic snapshot render', () => {
  const header = renderer.create(
    <Router history={createMemoryHistory()}>
      <Header />
    </Router>
  );

  expect(header.toJSON()).toMatchSnapshot();
});

test('Header correct tag content assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <Header />
    </Router>
  );

  expect(getByText(/Chow Down/).textContent).toEqual('Chow Down');
  expect(getByText(/Chow down on/).textContent).toEqual('Chow down on a weekly plan of your evening meals.');
});