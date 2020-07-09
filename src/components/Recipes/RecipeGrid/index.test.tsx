import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import theme from '../../../themes';
import RecipeGrid from '.';
import { Recipe } from '../../../store/domain/recipes/types';

const mockRecipes: Recipe[] = [{
  id: '123',
  title: 'fake_title1',
  description: 'fake_description1',
  rating: 4,
  url: 'fake_url1',
  image: 'fake_alt_text1',
  createdDate: 'fake_date1'
},
{
  id: '124',
  title: 'fake_title2',
  description: 'fake_description2',
  rating: 3,
  url: 'fake_url2',
  image: 'fake_alt_text2',
  createdDate: 'fake_date2'
}];

test('RecipeGrid basic snapshot render', () => {
  const recipeGrid = renderer.create(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <RecipeGrid isLoading={false} recipes={mockRecipes} />
      </ThemeProvider>
    </Router>
  );

  expect(recipeGrid.toJSON()).toMatchSnapshot();
});

test('RecipeGrid basic isLoading snapshot render', () => {
  const recipeGrid = renderer.create(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <RecipeGrid isLoading={true} recipes={mockRecipes} />
      </ThemeProvider>
    </Router>
  );

  expect(recipeGrid.toJSON()).toMatchSnapshot();
});

test('RecipeGrid correct tag content assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <RecipeGrid isLoading={false} recipes={mockRecipes} />
      </ThemeProvider>
    </Router>
  );

  expect(getByText(/fake_title1/).textContent).toEqual('fake_title1');
  expect(getByText(/fake_description1/).textContent).toEqual('fake_description1');
});

test('RecipeGrid render multiple recipes assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <RecipeGrid isLoading={false} recipes={mockRecipes} />
      </ThemeProvider>
    </Router>
  );

  expect(getByText(/fake_title2/).textContent).toEqual('fake_title2');
  expect(getByText(/fake_description2/).textContent).toEqual('fake_description2');
});

test('RecipeGrid correct class when not loading', () => {
  const { container } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <RecipeGrid isLoading={false} recipes={mockRecipes} />
      </ThemeProvider>
    </Router>
  );

  expect(container.querySelector('ul').classList).toContain('spinner');
  expect(container.querySelector('ul').classList).not.toContain('spinning');
});

test('RecipeGrid correct class when loading', () => {
  const { container } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <RecipeGrid isLoading={true} recipes={mockRecipes} />
      </ThemeProvider>
    </Router>
  );

  expect(container.querySelector('ul').classList).toContain('spinner');
  expect(container.querySelector('ul').classList).toContain('spinning');
});