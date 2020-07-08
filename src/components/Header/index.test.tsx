import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import theme from '../../theme';
import Header from '.';

test('Header basic snapshot render', () => {
  const header = renderer.create(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </Router>
  );

  expect(header.toJSON()).toMatchSnapshot();
});

test('Header correct tag content assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </Router>
  );

  expect(getByText(/Chow Down/).textContent).toEqual('Chow Down');
  expect(getByText(/Chow down on/).textContent).toEqual('Chow down on a weekly plan of your evening meals.');
});