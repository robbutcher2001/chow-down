import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import Footer from '.';

test('Footer basic snapshot render', () => {
  const footer = renderer.create(
    <ThemeProvider theme={theme}>
      <Footer />
    </ThemeProvider>
  );

  expect(footer.toJSON()).toMatchSnapshot();
});

test('Footer correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Footer />
    </ThemeProvider>
  );

  expect(getByText(/Rob Butcher/).textContent).toEqual('© Rob Butcher 2020.');
  expect(getByText(/Images/).textContent).toEqual('Images: Unsplash and various recipe websites.');
});