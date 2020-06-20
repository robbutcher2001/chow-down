import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { NegativeBox } from '.';

test('NegativeBox basic snapshot render', () => {
  const negativeBox = renderer.create(
    <NegativeBox message='test_negative' />
  );

  expect(negativeBox.toJSON()).toMatchSnapshot();
});

test('NegativeBox correct tag content assertion', () => {
  const { getByText } = render(
    <NegativeBox message='test_negative' />
  );

  expect(getByText(/test_negative/).textContent).toEqual('test_negative');
});