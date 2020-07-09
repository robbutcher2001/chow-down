import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../themes';
import IngredientMarker from '.';

test('IngredientMarker basic snapshot render', () => {
  const ingredientMarker = renderer.create(
    <ThemeProvider theme={theme}>
      <IngredientMarker mark={'A_MARKER'} />
    </ThemeProvider>
  );

  expect(ingredientMarker.toJSON()).toMatchSnapshot();
});

test('IngredientMarker correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <IngredientMarker mark={'A_MARKER'} />
    </ThemeProvider>
  );

  expect(getByText(/A_MARKER/).textContent).toEqual('A_MARKER');
});