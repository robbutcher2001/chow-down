import React from 'react';
import renderer from 'react-test-renderer';

import Stars from '.';

const mockRating = {
  rating: 4
};

test('Stars basic snapshot render', () => {
  const stars = renderer.create(
    <Stars {...mockRating} />
  );

  expect(stars.toJSON()).toMatchSnapshot();
});