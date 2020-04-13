import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import StarRating from '.';

const mockFormState = {
  rating: 2
};

test('StarRating basic snapshot render', () => {
  const starRating = renderer.create(
    <StarRating
      name='title'
      label='The Star Rating Title'
      form={mockFormState}
      setNewFormState={jest.fn}
    />
  );

  expect(starRating.toJSON()).toMatchSnapshot();
});

test('StarRating correct tag content assertion', () => {
  const { getByText } = render(
    <StarRating
      name='title'
      label='The Star Rating Title'
      form={mockFormState}
      setNewFormState={jest.fn}
    />
  );

  expect(getByText(/The Star Rating Title/).textContent).toEqual('The Star Rating Title');
});