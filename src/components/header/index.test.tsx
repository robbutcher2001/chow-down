import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Header from '.';

test('Header basic render', () => {
  const header = renderer.create(
    <Header />
  );

  expect(header.toJSON()).toMatchSnapshot();
  expect(header.root.props).toEqual({});
  // expect(header.root.children).toBeFalsy();
});

test('Header correct tag assertion', () => {
  const { getByText } = render(
    <Header />
  );

  expect(getByText(/Chow Down/).textContent).toContain('Chow Down');
});