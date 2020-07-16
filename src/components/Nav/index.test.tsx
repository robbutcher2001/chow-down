import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import Nav from '.';

test('Nav basic snapshot render', () => {
  const nav = renderer.create(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <Nav />
      </ThemeProvider>
    </Router>
  );

  expect(nav.toJSON()).toMatchSnapshot();
});

test('Nav correct tag content assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <Nav />
      </ThemeProvider>
    </Router>
  );

  expect(getByText(/Your Week/).textContent).toEqual('Your Week');
  expect(getByText(/Recipes/).textContent).toEqual('Recipes');
});