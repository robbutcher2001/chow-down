import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import RecipeCard from '.';

const mockRecipe = {
  id: 'fake_id',
  title: 'fake_title',
  description: 'fake_description',
  rating: 4,
  url: 'fake_url',
  image: 'fake_image',
  createdDate: 'fake_created_date'
};

test('RecipeCard basic snapshot render', () => {
  const recipeCard = renderer.create(
    <Router history={createMemoryHistory()}>
      <RecipeCard recipe={mockRecipe} />
    </Router>
  );

  expect(recipeCard.toJSON()).toMatchSnapshot();
});

test('RecipeCard correct tag content assertion', () => {
  const { getByText, getAllByText } = render(
    <Router history={createMemoryHistory()}>
      <RecipeCard recipe={mockRecipe} />
    </Router>
  );

  expect(getByText(/fake_title/).textContent).toEqual('fake_title');
  expect(getByText(/fake_description/).textContent).toEqual('fake_description');
  // expect(getAllByText(/\*/).length).toEqual(4);
});