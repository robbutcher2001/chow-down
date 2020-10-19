import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../themes';
import IngredientCard from '.';
import { Ingredient } from '../../../store/domain/ingredients/types';

const mockIngredient: Ingredient = {
  id: '123',
  name: 'fake_ingredient'
};

test('IngredientCard basic snapshot render', () => {
  const ingredientCard = renderer.create(
    <ThemeProvider theme={theme}>
      <IngredientCard ingredient={mockIngredient} />
    </ThemeProvider>
  );

  expect(ingredientCard.toJSON()).toMatchSnapshot();
});

test('IngredientCard correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <IngredientCard ingredient={mockIngredient} />
    </ThemeProvider>
  );

  expect(getByText(/fake_ingredient/).textContent).toEqual('fake_ingredient');
});