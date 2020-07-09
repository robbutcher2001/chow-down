import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import Stars from '.';

const mockRating = {
  rating: 4
};

test('Stars basic snapshot render', () => {
  const stars = renderer.create(
    <ThemeProvider theme={theme}>
      <Stars {...mockRating} />
    </ThemeProvider>
  );

  expect(stars.toJSON()).toMatchSnapshot();
});