import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import IngredientGrid from '.';
import { Ingredient } from '../../../store/domain/ingredients/types';

const mockIngredients: Ingredient[] = [{
  id: '123',
  ingredient: 'fake_ingredient1'
},
{
  id: '124',
  ingredient: 'fake_ingredient2'
}];

test('IngredientGrid basic snapshot render', () => {
  const ingredientGrid = renderer.create(
    <IngredientGrid isLoading={false} ingredients={mockIngredients} />
  );

  expect(ingredientGrid.toJSON()).toMatchSnapshot();
});

test('IngredientGrid basic isLoading snapshot render', () => {
  const ingredientGrid = renderer.create(
    <IngredientGrid isLoading={true} ingredients={mockIngredients} />
  );

  expect(ingredientGrid.toJSON()).toMatchSnapshot();
});

test('IngredientGrid correct tag content assertion', () => {
  const { getByText } = render(
    <IngredientGrid isLoading={false} ingredients={mockIngredients} />
  );

  expect(getByText(/fake_ingredient1/).textContent).toEqual('fake_ingredient1');
});

test('IngredientGrid render multiple ingredients assertion', () => {
  const { getByText } = render(
    <IngredientGrid isLoading={false} ingredients={mockIngredients} />
  );

  expect(getByText(/fake_ingredient1/).textContent).toEqual('fake_ingredient1');
  expect(getByText(/fake_ingredient2/).textContent).toEqual('fake_ingredient2');
});

test('IngredientGrid correct class when not loading', () => {
  const { container } = render(
    <IngredientGrid isLoading={false} ingredients={mockIngredients} />
  );

  expect(container.querySelector('ul').classList).toContain('spinner');
  expect(container.querySelector('ul').classList).not.toContain('spinning');
});

test('IngredientGrid correct class when loading', () => {
  const { container } = render(
    <IngredientGrid isLoading={true} ingredients={mockIngredients} />
  );

  expect(container.querySelector('ul').classList).toContain('spinner');
  expect(container.querySelector('ul').classList).toContain('spinning');
});