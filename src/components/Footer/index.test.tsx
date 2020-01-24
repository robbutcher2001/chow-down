import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Footer from '.';

test('Footer basic snapshot render', () => {
  const footer = renderer.create(
    <Footer />
  );

  expect(footer.toJSON()).toMatchSnapshot();
});

test('Footer correct tag content assertion', () => {
  const { getByText } = render(
    <Footer />
  );

  expect(getByText(/Rob Butcher/).textContent).toEqual('© Rob Butcher 2020.');
  expect(getByText(/Images/).textContent).toEqual('Images: Unsplash and various recipe websites.');
});