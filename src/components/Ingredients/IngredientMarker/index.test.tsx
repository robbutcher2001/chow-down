import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import IngredientMarker from '.';

test('IngredientMarker basic snapshot render', () => {
  const ingredientMarker = renderer.create(
    <IngredientMarker mark={'A_MARKER'} />
  );

  expect(ingredientMarker.toJSON()).toMatchSnapshot();
});

test('IngredientMarker correct tag content assertion', () => {
  const { getByText } = render(
    <IngredientMarker mark={'A_MARKER'} />
  );

  expect(getByText(/A_MARKER/).textContent).toEqual('A_MARKER');
});