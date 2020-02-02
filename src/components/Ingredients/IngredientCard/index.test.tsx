import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import IngredientCard from '.';
import { Ingredient } from '../../../store/domain/ingredients/types';

const mockIngredient: Ingredient = {
  id: '123',
  ingredient: 'fake_ingredient'
};

test('IngredientCard basic snapshot render', () => {
  const ingredientCard = renderer.create(
    <IngredientCard ingredient={mockIngredient} />
  );

  expect(ingredientCard.toJSON()).toMatchSnapshot();
});

test('IngredientCard correct tag content assertion', () => {
  const { getByText } = render(
    <IngredientCard ingredient={mockIngredient} />
  );

  expect(getByText(/fake_ingredient/).textContent).toEqual('fake_ingredient');
});