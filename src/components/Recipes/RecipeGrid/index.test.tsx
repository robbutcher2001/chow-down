import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import RecipeGrid from '.';
import { Recipe } from '../../../store/domain/recipes/types';

const mockRecipes: Recipe[] = [{
  id: '123',
  title: 'fake_title1',
  description: 'fake_description1',
  rating: 4,
  url: 'fake_url1',
  image: 'fake_alt_text1'
},
{
  id: '124',
  title: 'fake_title2',
  description: 'fake_description2',
  rating: 3,
  url: 'fake_url2',
  image: 'fake_alt_text2'
}];

test('RecipeGrid basic snapshot render', () => {
  const recipeGrid = renderer.create(
    <RecipeGrid recipes={mockRecipes} />
  );

  expect(recipeGrid.toJSON()).toMatchSnapshot();
});

test('RecipeGrid correct tag content assertion', () => {
  const { getByText } = render(
    <RecipeGrid recipes={mockRecipes} />
  );

  expect(getByText(/fake_title1/).textContent).toEqual('fake_title1');
  expect(getByText(/fake_description1/).textContent).toEqual('fake_description1');
});

test('RecipeGrid render multiple recipes assertion', () => {
  const { getByText } = render(
    <RecipeGrid recipes={mockRecipes} />
  );

  expect(getByText(/fake_title2/).textContent).toEqual('fake_title2');
  expect(getByText(/fake_description2/).textContent).toEqual('fake_description2');
});