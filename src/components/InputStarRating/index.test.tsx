import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import StarRating from '.';

const mockFormState = {
  rating: 2
};

test('StarRating basic snapshot render', () => {
  const starRating = renderer.create(
    <ThemeProvider theme={theme}>
      <StarRating
        name='title'
        label='The Star Rating Title'
        form={mockFormState}
        setNewFormState={jest.fn}
      />
    </ThemeProvider>
  );

  expect(starRating.toJSON()).toMatchSnapshot();
});

test('StarRating correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <StarRating
        name='title'
        label='The Star Rating Title'
        form={mockFormState}
        setNewFormState={jest.fn}
      />
    </ThemeProvider>
  );

  expect(getByText(/The Star Rating Title/).textContent).toEqual('The Star Rating Title');
});